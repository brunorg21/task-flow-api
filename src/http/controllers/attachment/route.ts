import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { upload } from "./upload";
import { download } from "./download";
import { deleteAttachment } from "./delete";

export async function attachmentRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/upload", upload);
  app.get("/download/:fileName", download);
  app.delete("/attachments/:attachmentId/:fileName", deleteAttachment);
}
