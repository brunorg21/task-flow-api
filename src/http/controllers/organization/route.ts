import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function organizationRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/organizations", create);
}
