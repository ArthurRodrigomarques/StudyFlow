import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async () => {
  return { message: "Hello World" };
});

const start = async () => {
  try {
    await app.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
