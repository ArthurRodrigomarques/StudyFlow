import "dotenv/config"; // já carrega .env
import fastify from "fastify";
import jwtPlugin from "./plugins/jwt";
import loginRoute from "./routes/auth/login";
import signupRoute from "./routes/auth/signup";
import protectedRoute from "./routes/auth/protected";
import subjectsRoutes from "./routes/subjects/index";

const app = fastify({ logger: true });

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

// subjects assuntos
app.register(subjectsRoutes, { prefix: "/subjects" });


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
