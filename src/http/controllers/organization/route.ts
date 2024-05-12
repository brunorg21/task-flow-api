import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { edit } from "./edit";
import { deleteOrganization } from "./delete";
import { findUniqueOrganization } from "./find-unique-organization";
import { findManyOrganization } from "./find-many-organization";

export async function organizationRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/organizations", create);
  app.put("/organizations/:organizationId", edit);
  app.delete("/organizations/:organizationId", deleteOrganization);
  app.get("/organizations/:organizationId", findUniqueOrganization);
  app.get("/organizations", findManyOrganization);
}
