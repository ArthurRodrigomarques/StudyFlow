import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";
import { z } from "zod";

export default async function updateGoal(app: FastifyInstance) {
  app.put("/:id", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const paramsSchema = z.object({ id: z.string().uuid() });
    const bodySchema = z
      .object({
        title: z.string().min(1).optional(),
        progress: z.number().int().min(0).optional(),
      })
      .strict();

    const paramsValidation = paramsSchema.safeParse(req.params);
    const bodyValidation = bodySchema.safeParse(req.body);

    if (!paramsValidation.success || !bodyValidation.success) {
      return reply.status(400).send({ error: "Dados inválidos" });
    }

    const { id } = paramsValidation.data;
    const { title, progress } = bodyValidation.data;
    const userId = req.user.id;

    const dataToUpdate: { title?: string; progress?: number } = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (progress !== undefined) dataToUpdate.progress = progress;

    if (Object.keys(dataToUpdate).length === 0) {
      return reply.status(400).send({ error: "Nenhum campo para atualizar." });
    }

    try {
      const result = await prisma.goal.updateMany({
        where: {
          id,
          userId,
        },
        data: dataToUpdate,
      });

      if (result.count === 0) {
        return reply
          .status(404)
          .send({
            error: "Meta não encontrada ou não pertence a este usuário.",
          });
      }

      return reply.send({ message: "Meta atualizada com sucesso." });
    } catch (error) {
      req.log.error(error);
      return reply
        .status(500)
        .send({ error: "Não foi possível atualizar a meta." });
    }
  });
}
