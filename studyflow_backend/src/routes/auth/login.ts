import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { supabase } from "../../plugins/supabaseClient";
import { prisma } from "../../plugins/prismaClient";
import bcrypt from "bcrypt";

export default async function loginRoute(app: FastifyInstance) {
  app.post("/login", async (req, reply) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const { email, password } = schema.parse(req.body);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data?.user)
        return reply
          .status(401)
          .send({ error: error?.message || "Credenciais inválidas" });

      const supabaseUser = data.user;
      const userId = supabaseUser.id;

      let prismaUser = await prisma.user.findUnique({ where: { id: userId } });

      if (!prismaUser) {
        const fallbackName =
          (supabaseUser.user_metadata &&
            (supabaseUser.user_metadata as any).name) ||
          (supabaseUser.email ? supabaseUser.email.split("@")[0] : "User");
        const hashed = await bcrypt.hash(password, 10);
        prismaUser = await prisma.user.create({
          data: {
            id: userId,
            email: supabaseUser.email ?? email,
            name: fallbackName,
            password: hashed,
          },
        });
      } else {
        const passwordIsEmpty = !prismaUser.password;
        if (passwordIsEmpty) {
          const hashed = await bcrypt.hash(password, 10);
          await prisma.user.update({
            where: { id: prismaUser.id },
            data: { password: hashed },
          });
          prismaUser = await prisma.user.findUnique({
            where: { id: prismaUser.id },
          });
        }
      }

      const token = app.jwt.sign({ userId: userId });

      const { password: _, ...sanitized } = prismaUser as any;

      return reply.send({ token, user: sanitized });
    } catch (err) {
      if (err instanceof ZodError)
        return reply.status(400).send({ error: err.issues });
      app.log.error(err);
      return reply.status(500).send({ error: "Erro interno no servidor" });
    }
  });
}
