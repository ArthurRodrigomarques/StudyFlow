import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function update(app: FastifyInstance) {
  app.put("/:id", { preHandler: [app.authenticate] }, async (req, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const bodySchema = z.object({
      duration: z.number().min(1).optional(),
      notes: z.string().optional(),
    });

    const { id } = paramsSchema.parse(req.params);
    const data = bodySchema.parse(req.body);
    const userId = (req.user as { userId: string }).userId;

    try {
      const updated = await prisma.session.update({
        where: { id, userId },
        data: {
          ...(data.duration !== undefined && {
            duration: { set: data.duration },
          }),
          ...(data.notes !== undefined && { notes: { set: data.notes } }),
        },
      });
      return reply.send(updated);
    } catch (err) {
      req.log.error(err);
      return reply
        .status(500)
        .send({ error: "Não foi possível atualizar a sessão" });
    }
  });
}
