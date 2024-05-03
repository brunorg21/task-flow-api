import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findById } from "./find-by-id";
import { edit } from "./edit";
import { deleteTask } from "./delete";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/task", create);
  app.get("/task/:id", findById);
  app.put("/task/:id", edit);
  app.delete("/task/:id", deleteTask);
}
