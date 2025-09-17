import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";

export default async function getAll(app: FastifyInstance) {
  app.get("/", { preHandler: [app.authenticate] }, async (req: any, reply) => {
    try {
      const goals = await prisma.goal.findMany({
        where: { userId: req.user.userId },
        orderBy: { createdAt: "desc" },
      });

      return reply.send(goals);
    } catch (error) {
      req.log.error(error);
      return reply
        .status(500)
        .send({ error: "Não foi possivel listar as metas" });
    }
  });
}
