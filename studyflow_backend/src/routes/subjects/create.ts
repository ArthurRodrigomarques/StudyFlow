import { FastifyInstance } from "fastify";
import { z } from "zod"; // 'z' é a convenção padrão
import { prisma } from "../../plugins/prismaClient";

export default async function create(app: FastifyInstance) {
  app.post("/create", { onRequest: [app.authenticate] }, async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ error: "Não autorizado" });
    }

    const schema = z.object({
      name: z.string().min(1, "Nome é obrigatório"),
      color: z.string().optional(),
    });

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return reply.status(400).send({
        error: "Dados inválidos",
        details: validation.error.format(),
      });
    }

    const { name, color } = validation.data;

    const userId = req.user.id;

    try {
      const subject = await prisma.subject.create({
        data: {
          name,
          color: color ?? null,
          userId,
        },
      });
      return reply.status(201).send(subject);
    } catch (err) {
      app.log.error(err);
      return reply.status(500).send({
        error: "Não foi possível criar a matéria",
      });
    }
  });
}
