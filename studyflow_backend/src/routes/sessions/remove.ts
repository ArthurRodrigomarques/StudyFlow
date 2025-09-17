import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function remove(app: FastifyInstance) {
  app.delete("/:id", { preHandler: [app.authenticate] }, async (req, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const { id } = paramsSchema.parse(req.params);
    const userId = (req.user as { userId: string }).userId;

    try {
      await prisma.session.delete({
        where: { id, userId },
      });

      return reply.send({ message: "Sessão removida com sucesso" });
    } catch (error) {
      return reply
        .status(500)
        .send({ error: "Não foi possivel remover a sessão" });
    }
  });
}
