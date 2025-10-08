import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  subDays,
} from "date-fns";

export default async function statsRoute(app: FastifyInstance) {
  app.get("/stats", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }
    const userId = req.user.id;

    try {
      const today = new Date();

      // --- Cálculo do Tempo de Estudo ---
      const totalStudy = await prisma.session.aggregate({
        _sum: { duration: true },
        where: { userId },
      });

      const todayStudy = await prisma.session.aggregate({
        _sum: { duration: true },
        where: { userId, date: { gte: startOfDay(today) } },
      });

      const last7DaysStudy = await prisma.session.aggregate({
        _sum: { duration: true },
        where: { userId, date: { gte: subDays(today, 7) } },
      });

      // --- Cálculo das Metas do Mês ---
      const monthlyGoalsTotal = await prisma.goal.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth(today), lte: endOfMonth(today) },
        },
      });

      const monthlyGoalsCompleted = await prisma.goal.count({
        where: {
          userId,
          completed: true,
          createdAt: { gte: startOfMonth(today), lte: endOfMonth(today) },
        },
      });

      // --- Formatação dos Dados ---
      const formatDuration = (minutes: number | null) => {
        if (!minutes) return "0h 0m";
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
      };

      // --- Montagem do Objeto de Resposta ---
      const stats = {
        totalStudyTime: formatDuration(totalStudy._sum.duration),
        todayStudyTime: formatDuration(todayStudy._sum.duration),
        weeklyProgress: last7DaysStudy._sum.duration || 0, // Ex: 420 minutos
        monthlyGoals: {
          completed: monthlyGoalsCompleted,
          total: monthlyGoalsTotal,
        },
      };

      return reply.send(stats);
    } catch (error) {
      req.log.error(error);
      return reply
        .status(500)
        .send({ error: "Não foi possível calcular as estatísticas" });
    }
  });
}
