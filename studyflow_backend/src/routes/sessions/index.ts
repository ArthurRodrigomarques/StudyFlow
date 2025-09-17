import { FastifyInstance } from "fastify";
import create from "./create";
import getAll from "./getAll";
import update from "./update";
import remove from "./remove";

export default async function sessionsRoutes(app: FastifyInstance) {
  app.register(async (r) => {
    await r.register(create);
    await r.register(getAll);
    await r.register(update);
    await r.register(remove);
  });
}
