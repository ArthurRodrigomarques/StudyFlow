import { FastifyInstance } from "fastify";
import getAll from "./getAll";
import create from "./create";
import update from "./update";
import remove from "./remove";

export default async function subjectsRoutes(app: FastifyInstance) {
  app.register(async (r) => {
    await r.register(getAll);
    await r.register(create);
    await r.register(update);
    await r.register(remove);
  });
}
