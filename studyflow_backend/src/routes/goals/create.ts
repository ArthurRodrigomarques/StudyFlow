import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function createGoal(app: FastifyInstance) {
  app.post("/create", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const schema = z.object({
      title: z.string().min(1, "O título é obrigatório."),
      progress: z.number().int().nonnegative().optional(),
    });

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return reply.status(400).send({
        error: "Dados inválidos",
        details: validation.error.format(),
      });
    }

    const { title, progress } = validation.data;
    const userId = req.user.id;

    try {
      const goal = await prisma.goal.create({
        data: {
          title,
          progress: progress ?? 0,
          userId: userId,
        },
      });

      return reply.status(201).send(goal);
    } catch (err) {
      req.log.error(err);
      return reply.status(500).send({ error: "Não foi possível criar a meta" });
    }
  });
}
