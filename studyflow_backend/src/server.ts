import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt";
import loginRoute from "./routes/auth/login";
import signupRoute from "./routes/auth/signup";
import protectedRoute from "./routes/auth/protected";
import subjectsRoutes from "./routes/subjects/index";
import goalsRoutes from "./routes/goals";
import sessionsRoutes from "./routes/sessions";

const app = fastify({ logger: true });

// cors
app.register(cors, {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
});
// rota teste
app.get("/", async () => {
  return { message: "Hello World" };
});

// jwt plugin
app.register(jwtPlugin);

// auth
app.register(loginRoute);
app.register(signupRoute);
app.register(protectedRoute);

// subjects assuntos routes
app.register(subjectsRoutes, { prefix: "/subjects" });
// goals metas routs
app.register(goalsRoutes, { prefix: "/goals" });
// sessions routes
app.register(sessionsRoutes, { prefix: "/sessions" });

const start = async () => {
  try {
    await app.listen({ port: 4000, host: "0.0.0.0" }); // mais seguro em dev
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
