import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function update(app: FastifyInstance) {
  app.put(
    "/:id",
    { preHandler: [app.authenticate] },
    async (req: any, reply) => {
      try {
        const schema = z.object({
          name: z.string().min(1).optional(),
          color: z.string().optional(),
        });

        const { name, color } = schema.parse(req.body);
        const { id } = req.params;

        const updatedSubject = await prisma.subject.updateMany({
          where: { id, userId: req.user.userId },
          data: {
            ...(name !== undefined && { name }),
            ...(color !== undefined && { color }),
          },
        });

        if (updatedSubject.count === 0) {
          return reply.status(404).send({ error: "Matéria não encontrada" });
        }

        return reply.send({ message: "Matéria atualizada com sucesso" });
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({ error: error.issues });
        }
        app.log.error(error);
        return reply.status(500).send({ error: "Não foi possivel atualizar a máteria"})
      }
    }
  );
}
