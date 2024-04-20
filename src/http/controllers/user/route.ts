import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", create);
  app.post("/authenticate", authenticate);
}
