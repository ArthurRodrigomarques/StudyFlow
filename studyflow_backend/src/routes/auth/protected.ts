import { FastifyInstance } from "fastify";

export default async function protectedRoute(app: FastifyInstance) {
  app.get("/protected", { preHandler: [app.authenticate] }, async (req) => {
    return {
      message: "Você acessou uma rota protegida!",
      user: req.user,
    };
  });
}
