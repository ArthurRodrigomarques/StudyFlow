import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function update(app: FastifyInstance) {
  app.put("/:id", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const paramsSchema = z.object({ id: z.string().uuid() });
    const bodySchema = z
      .object({
        duration: z.number().min(1).optional(),
        notes: z.string().nullable().optional(),
      })
      .strict();

    const paramsValidation = paramsSchema.safeParse(req.params);
    const bodyValidation = bodySchema.safeParse(req.body);

    if (!paramsValidation.success || !bodyValidation.success) {
      return reply.status(400).send({ error: "Dados inválidos" });
    }

    const { id } = paramsValidation.data;
    const { duration, notes } = bodyValidation.data;
    const userId = req.user.id;

    const dataToUpdate: { duration?: number; notes?: string | null } = {};

    if (duration !== undefined) {
      dataToUpdate.duration = duration;
    }
    if (notes !== undefined) {
      dataToUpdate.notes = notes;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return reply
        .status(400)
        .send({ error: "Nenhum dado fornecido para atualização." });
    }

    try {
      const result = await prisma.session.updateMany({
        where: {
          id,
          userId,
        },
        data: dataToUpdate,
      });

      if (result.count === 0) {
        return reply.status(404).send({
          error: "Sessão não encontrada ou não pertence a este usuário.",
        });
      }

      return reply.send({ message: "Sessão atualizada com sucesso" });
    } catch (err) {
      req.log.error(err);
      return reply
        .status(500)
        .send({ error: "Não foi possível atualizar a sessão" });
    }
  });
}
