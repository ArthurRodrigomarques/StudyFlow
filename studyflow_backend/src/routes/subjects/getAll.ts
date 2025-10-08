import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";

export default async function getAll(app: FastifyInstance) {
  app.get("/", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }
    const userId = req.user.id;

    try {
      const subjects = await prisma.subject.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
      });

      const durationSums = await prisma.session.groupBy({
        by: ["subjectId"],
        _sum: {
          duration: true,
        },
        where: { userId },
      });

      const durationMap = new Map(
        durationSums.map((item) => [item.subjectId, item._sum.duration || 0])
      );

      const subjectsWithTotalTime = subjects.map((subject) => ({
        ...subject,
        totalStudyTime: durationMap.get(subject.id) || 0,
      }));

      return reply.send(subjectsWithTotalTime);
    } catch (error) {
      req.log.error(error);
      return reply
        .status(500)
        .send({ error: "Não foi possível listar as matérias" });
    }
  });
}
