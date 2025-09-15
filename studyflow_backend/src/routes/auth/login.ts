import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { supabase } from "../../plugins/supabaseClient";

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

      if (error || !data.user) {
        return reply.status(401).send({
          error: error?.message || "Credenciais inválidas",
        });
      }

      const token = app.jwt.sign({ userId: data.user.id });

      return reply.send({ token, user: data.user });
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues });
      }
      app.log.error(err);
      return reply.status(500).send({ error: "Erro interno no servidor" });
    }
  });
}
