import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { supabase } from "./supabaseClient";
import { User } from "@supabase/supabase-js";

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}

async function authenticatePlugin(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
          throw new Error("Token de autorização ausente.");
        }
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
          throw new Error("Token inválido ou expirado.");
        }
        req.user = data.user;
      } catch (err) {
        reply.code(401).send({ error: "Não autorizado" });
      }
    }
  );
}

export default fp(authenticatePlugin);