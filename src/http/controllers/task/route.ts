import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/task", create);
}
