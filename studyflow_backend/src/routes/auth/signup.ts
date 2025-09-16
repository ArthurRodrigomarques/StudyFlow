import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { supabase } from "../../plugins/supabaseClient";
import { prisma } from "../../plugins/prismaClient";
import bcrypt from "bcrypt";

export default async function signupRoute(app: FastifyInstance) {
  app.post("/signup", async (req, reply) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(1),
      });

      const { email, password, name } = schema.parse(req.body);

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error || !data?.user)
        return reply
          .status(400)
          .send({
            error: error?.message || "Erro ao criar usuário no Supabase",
          });

      const hashed = await bcrypt.hash(password, 10);

      const prismaUser = await prisma.user.upsert({
        where: { id: data.user.id },
        update: { email: data.user.email ?? email, name, password: hashed },
        create: {
          id: data.user.id,
          email: data.user.email ?? email,
          name,
          password: hashed,
        },
      });

      const token = app.jwt.sign({ userId: prismaUser.id });

      const { password: _, ...sanitized } = prismaUser as any;

      return reply.status(201).send({ token, user: sanitized });
    } catch (err) {
      if (err instanceof ZodError)
        return reply.status(400).send({ error: err.issues });
      app.log.error(err);
      return reply.status(500).send({ error: "Erro interno no servidor" });
    }
  });
}
