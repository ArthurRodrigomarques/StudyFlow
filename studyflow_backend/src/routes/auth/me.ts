import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";

export default async function meRoute(app: FastifyInstance) {
  app.get("/auth/me", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.code(401).send({ error: "Não autorizado" });
    }

    const supabaseUserId = req.user.id;

    const userFromDb = await prisma.user.findUnique({
      where: { id: supabaseUserId },
    });

    if (!userFromDb) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    return reply.send(userFromDb);
  });
}
