import { FastifyInstance } from "fastify";
import { prisma } from "../../plugins/prismaClient";
import z from "zod";

export default async function remove(app: FastifyInstance) {
  app.delete(
    "/:id",
    { preHandler: [app.authenticate] },
    async (req: any, reply) => {
      const schema = z.object({ id: z.string().uuid() });

      try {
        const { id } = schema.parse(req.params);

        await prisma.goal.delete({
          where: { id, userId: req.user.userId },
        });

        return reply.send({ message: "Meta removida com sucesso" });
      } catch (err) {
        req.log.error(err);
        return reply
          .status(400)
          .send({ error: "Não foi possível remover a meta" });
      }
    }
  );
}
