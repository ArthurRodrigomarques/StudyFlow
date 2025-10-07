import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";
import { z } from "zod";

export default async function remove(app: FastifyInstance) {
  app.delete("/:id", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const schema = z.object({ id: z.string().uuid() });
    const validation = schema.safeParse(req.params);

    if (!validation.success) {
      return reply.status(400).send({ error: "ID inválido" });
    }

    const { id } = validation.data;
    const userId = req.user.id;

    try {
      const result = await prisma.goal.deleteMany({
        where: {
          id,
          userId,
        },
      });

      if (result.count === 0) {
        return reply
          .status(404)
          .send({
            error: "Meta não encontrada ou não pertence a este usuário.",
          });
      }

      return reply.send({ message: "Meta removida com sucesso" });
    } catch (err) {
      req.log.error(err);
      return reply
        .status(500)
        .send({ error: "Não foi possível remover a meta" });
    }
  });
}
