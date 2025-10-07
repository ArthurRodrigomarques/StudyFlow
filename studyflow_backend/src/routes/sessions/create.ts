import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../plugins/prismaClient";

export default async function createSession(app: FastifyInstance) {
  app.post("/", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const schema = z.object({
      subjectId: z.string().uuid("ID da matéria inválido."),
      duration: z.number().min(1, "A duração deve ser de pelo menos 1 minuto."),
      notes: z.string().optional(),
    });

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return reply.status(400).send({
        error: "Dados inválidos",
        details: validation.error.format(),
      });
    }

    const { subjectId, duration, notes } = validation.data;

    const userId = req.user.id;

    try {
      const subjectExists = await prisma.subject.findFirst({
        where: {
          id: subjectId,
          userId: userId,
        },
      });

      if (!subjectExists) {
        return reply
          .status(404)
          .send({
            error: "Matéria não encontrada ou não pertence a este usuário.",
          });
      }

      const session = await prisma.session.create({
        data: {
          duration,
          notes: notes ?? null,
          subjectId,
          userId,
        },
      });

      return reply.status(201).send(session);
    } catch (err) {
      req.log.error(err);
      return reply
        .status(500)
        .send({ error: "Não foi possível criar a sessão" });
    }
  });
}
