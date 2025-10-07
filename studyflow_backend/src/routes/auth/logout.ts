import { FastifyInstance } from "fastify";

export default async function logoutRoute(app: FastifyInstance) {
  app.post("/auth/logout", async (_req, reply) => {
    reply.clearCookie("token", { path: "/" }).send({ ok: true });
  });
}
