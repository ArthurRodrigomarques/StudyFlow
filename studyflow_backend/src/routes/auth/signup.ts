import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { supabase } from "../../plugins/supabaseClient";
import { prisma } from "../../plugins/prismaClient";

export default async function signupRoute(app: FastifyInstance) {
  app.post("/signup", async (req, reply) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(6, "A senha precisa ter no mínimo 6 caracteres"),
        name: z.string().min(3, "O nome é obrigatório"),
      });

      const { email, password, name } = schema.parse(req.body);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (authError) {
        return reply.status(400).send({ error: authError.message });
      }

      if (!authData.user) {
        return reply
          .status(500)
          .send({ error: "Não foi possível criar o usuário no Supabase." });
      }

      await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          name: name,
        },
      });

      return reply.status(201).send({
        message: "Cadastro realizado! Verifique seu e-mail para confirmação.",
        user: authData.user,
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues });
      }

      if (err.code === "P2002") {
        return reply
          .status(409)
          .send({ error: "Um usuário com este e-mail já existe." });
      }

      app.log.error(err);
      return reply.status(500).send({ error: "Erro interno no servidor" });
    }
  });
}
