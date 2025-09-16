import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function remove(app: FastifyInstance) {
  app.delete(
    "/:id",
    { preHandler: [app.authenticate] },
    async (req: any, reply) => {
      try {
        const { id } = req.params;

        const deletedSubject = await prisma.subject.deleteMany({
          where: { id, userId: req.user.userId },
        });

        if (deletedSubject.count === 0) {
          return reply.status(404).send({ error: "Máteria não encontrada" });
        }

        return reply.send({ message: "Matéria removida com sucesso" });
      } catch (error) {
        return reply
          .status(500)
          .send({ error: "Não foi possivel remover a matéria" });
      }
    }
  );
}
