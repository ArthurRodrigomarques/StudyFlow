import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function create(app: FastifyInstance) {
  app.post("/", { preHandler: [app.authenticate] }, async (req, reply) => {
    const schema = z.object({
      subjectId: z.string().uuid(),
      duration: z.number().min(1),
      notes: z.string().optional(),
    });

    const { subjectId, duration, notes } = schema.parse(req.body);
    const userId = (req.user as { userId: string }).userId;

    try {
      const session = await prisma.session.create({
        data: {
          subjectId,
          userId,
          duration,
          notes: notes ?? null,
        },
      });
      return reply.send(session);
    } catch (err) {
      req.log.error(err);
      return reply
        .status(500)
        .send({ error: "Não foi possível criar a sessão" });
    }
  });
}
