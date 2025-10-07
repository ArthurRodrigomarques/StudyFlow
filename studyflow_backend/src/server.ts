import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import authenticatePlugin from "./plugins/authenticate";
import loginRoute from "./routes/auth/login";
import signupRoute from "./routes/auth/signup";
import protectedRoute from "./routes/auth/protected";
import authMe from "./routes/auth/me";
import subjectsRoutes from "./routes/subjects/index";
import goalsRoutes from "./routes/goals";
import sessionsRoutes from "./routes/sessions";

const app = fastify({ logger: true });

const start = async () => {
  // --- PLUGINS ---
  await app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || "um-segredo-bem-forte",
    hook: "onRequest",
  });

  await app.register(authenticatePlugin);

  // rota teste
  app.get("/", async () => {
    return { message: "Hello World" };
  });

  // auth
  await app.register(loginRoute);
  await app.register(signupRoute);
  await app.register(protectedRoute);
  await app.register(authMe);

  // rotas de dados
  await app.register(subjectsRoutes, { prefix: "/subjects" });
  await app.register(goalsRoutes, { prefix: "/goals" });
  await app.register(sessionsRoutes, { prefix: "/sessions" });

  try {
    await app.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
