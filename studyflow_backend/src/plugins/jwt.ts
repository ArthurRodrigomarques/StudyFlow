import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(async (app: any) => {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    sign: { expiresIn: "7d" },
  });

  app.decorate("authenticate", async (req: any, reply: any) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });
});
