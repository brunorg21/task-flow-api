import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { upload } from "./upload";

export async function attachmentRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/upload", upload);
}
