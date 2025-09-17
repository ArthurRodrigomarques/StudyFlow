import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function createGoal(app: FastifyInstance) {
  app.post(
    "/create",
    { preHandler: [app.authenticate] },
    async (req: any, reply) => {
      const schema = z.object({
        title: z.string().min(1, "Título obrigatório"),
        progress: z.number().int().nonnegative().optional(),
      });

      try {
        const { title, progress } = schema.parse(req.body);

        const goal = await prisma.goal.create({
          data: {
            title,
            progress: progress ?? 0,
            userId: req.user.userId,
          },
        });

        return reply.status(201).send(goal);
      } catch (err) {
        req.log.error(err);
        return reply.status(400).send({ error: "Não foi possível criar a meta" });
      }
    }
  );
}
