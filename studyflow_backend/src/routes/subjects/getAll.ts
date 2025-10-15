import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";
import { subDays } from "date-fns";

export default async function getAll(app: FastifyInstance) {
  app.get("/", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }
    const userId = req.user.id;

    try {
      const subjects = await prisma.subject.findMany({
        where: { userId },
        include: {
          sessions: {
            orderBy: { date: "desc" },
          },
        },
        orderBy: { createdAt: "asc" },
      });

      const sevenDaysAgo = subDays(new Date(), 7);

      const subjectsWithStats = subjects.map((subject) => {
        const totalStudyTime = subject.sessions.reduce(
          (sum, s) => sum + s.duration,
          0
        );
        const weeklyTime = subject.sessions
          .filter((s) => new Date(s.date) >= sevenDaysAgo)
          .reduce((sum, s) => sum + s.duration, 0);

        return {
          id: subject.id,
          name: subject.name,
          color: subject.color,
          createdAt: subject.createdAt,
          totalStudyTime,
          weeklyTime,
          sessionsCount: subject.sessions.length,
          lastStudied: subject.sessions[0]?.date || null,
        };
      });

      return reply.send(subjectsWithStats);
    } catch (error) {
      req.log.error(error);
      return reply
        .status(500)
        .send({ error: "Não foi possível listar as matérias" });
    }
  });
}
