import { FastifyInstance } from "fastify";
import { create } from "./create";
import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { findByOrganization } from "./find-by-organization";

export async function userOrganizationRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/userOrganization", create);
  app.get("/userOrganization/:slug", findByOrganization);
}
