import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";
import { z } from "zod";

export default async function updateGoal(app: FastifyInstance) {
  app.put(
    "/:id",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });

      const bodySchema = z.object({
        title: z.string().min(1).optional(),
        progress: z.number().int().min(0).optional(),
      });

      // valida params e body
      const { id } = paramsSchema.parse(request.params);
      const { title, progress } = bodySchema.parse(request.body);

      try {
        // monta apenas os campos enviados
        const data: Record<string, any> = {};
        if (title !== undefined) {
          data.title = { set: title };
        }
        if (progress !== undefined) {
          data.progress = { set: progress };
        }

        if (Object.keys(data).length === 0) {
          return reply
            .status(400)
            .send({ error: "Nenhum campo para atualizar." });
        }

        const goal = await prisma.goal.update({
          where: { id },
          data,
        });

        return goal;
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Não foi possível atualizar a meta." });
      }
    }
  );
}
