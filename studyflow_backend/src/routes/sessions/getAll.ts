import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";

export default async function getAll(app: FastifyInstance) {
  app.get("/", { preHandler: [app.authenticate] }, async (req, reply) => {
    const userId = (req.user as { userId: string }).userId;

    try {
      const sessions = await prisma.session.findMany({
        where: { userId },
        include: { subject: true },
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
