import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function create(app: FastifyInstance) {
  app.post(
    "/create",
    { preHandler: [app.authenticate] },
    async (req, reply) => {
      try {
        const schema = z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          color: z.string().optional(),
        });

        const { name, color } = schema.parse(req.body);

        const userId = (req.user as { userId: string }).userId;

        const subject = await prisma.subject.create({
          data: {
            name,
            color: color ?? null,
            userId,
          },
        });

        return reply.status(201).send(subject);
      } catch (err) {
        app.log.error(err);
        return reply.status(500).send({
          error: "Não foi possivel criar a matéria",
          details: err instanceof Error ? err.message : err,
        });
      }
    }
  );
}
