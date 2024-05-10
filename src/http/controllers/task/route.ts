import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findById } from "./find-by-id";
import { edit } from "./edit";
import { deleteTask } from "./delete";
import { findManyByUser } from "./find-many-by-user";
import { findManyByOrganization } from "./find-many-by-organization";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/tasks", create);
  app.get("/tasks/:id", findById);
  app.get("/tasks/user", findManyByUser);
  app.get("/tasks/organization/:organizationId", findManyByOrganization);
  app.put("/tasks/:id", edit);
  app.delete("/tasks/:id", deleteTask);
}
