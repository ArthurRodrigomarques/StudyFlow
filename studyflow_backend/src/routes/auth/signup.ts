import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { supabase } from "../../plugins/supabaseClient";

export default async function signupRoute(app: FastifyInstance) {
  app.post("/signup", async (req, reply) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
      });

      const { email, password } = schema.parse(req.body);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return reply.status(400).send({ error: error.message });
      }

      return reply.send({
        message: "Usuário criado com sucesso!",
        user: data.user,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues });
      }
      app.log.error(err);
      return reply.status(500).send({ error: "Erro interno no servidor" });
    }
  });
}
