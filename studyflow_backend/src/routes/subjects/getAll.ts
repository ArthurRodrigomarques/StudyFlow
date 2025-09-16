import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";

export default async function getAll(app: FastifyInstance) {
  app.get("/", { preHandler: [app.authenticate] }, async (req: any, reply) => {
    try {
      const subjects = await prisma.subject.findMany({
        where: { userId: req.user.userId },
        orderBy: { createdAt: "desc" },
      });

      return reply.send(subjects);
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        error: "Não foi possivel buscar as matérias",
      });
    }
  });
}
