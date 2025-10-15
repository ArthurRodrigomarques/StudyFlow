import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";

export default async function getAll(app: FastifyInstance) {
  app.get("/", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }
    const userId = req.user.id;

    try {
      const sessions = await prisma.session.findMany({
        where: { userId },
        include: {
          subject: {
            select: {
              name: true,
              color: true,
            },
          },
        },
        orderBy: { date: "desc" },
      });

      return reply.send(sessions);
    } catch (error) {
      req.log.error(error);
      return reply
        .status(500)
        .send({ error: "Não foi possível listar as sessões" });
    }
  });
}
