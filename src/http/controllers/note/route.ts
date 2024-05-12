import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findUnique } from "./find-unique";
import { findManyByTask } from "./find-many-by-task";
import { deleteNote } from "./delete";
import { editNote } from "./edit";

export async function noteRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/notes", create);
  app.get("/notes/:noteId", findUnique);
  app.get("/notes/tasks/:taskId", findManyByTask);
  app.delete("/notes/:noteId", deleteNote);
  app.put("/notes/:noteId", editNote);
}
