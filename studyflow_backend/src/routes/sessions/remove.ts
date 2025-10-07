import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function remove(app: FastifyInstance) {
  app.delete("/:id", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const paramsSchema = z.object({ id: z.string().uuid() });
    const validation = paramsSchema.safeParse(req.params);

    if (!validation.success) {
      return reply.status(400).send({ error: "ID inválido" });
    }

    const { id } = validation.data;
    const userId = req.user.id;

    try {
      const result = await prisma.session.deleteMany({
        where: {
          id,
          userId,
        },
      });

      if (result.count === 0) {
        return reply.status(404).send({ error: "Sessão não encontrada" });
      }

      return reply.status(200).send({ message: "Sessão removida com sucesso" });
    } catch (error) {
      return reply
        .status(500)
        .send({ error: "Não foi possível remover a sessão" });
    }
  });
}
