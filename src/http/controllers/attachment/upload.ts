import { supabaseClient } from "@/db/supabase/client";
import { makeCreateAttachmentUseCase } from "@/http/factories/make-create-attachment-use-case";
import { IAttachmentCreate } from "@/models/attachment-model";
import { FastifyRequest, FastifyReply } from "fastify";

export async function upload(req: FastifyRequest, reply: FastifyReply) {
  const parts = req.files();
  let attachments: IAttachmentCreate[] = [];
  for await (const part of parts) {
    try {
      const { data } = await supabaseClient.storage
        .from("attachments")
        .upload(part.filename, await part.toBuffer());

      if (data)
        attachments.push({
          fileName: part.filename,
          noteId: null,
          taskId: null,
          type: part.mimetype,
          url: data.path,
        });
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Erro do servidor ao fazer upload" });
    }
  }

  try {
    const createAttachment = makeCreateAttachmentUseCase();

    if (attachments) {
      const createdAttachments = await createAttachment.execute(attachments);

      return reply.status(201).send({
        createdAttachments,
      });
    }
  } catch (error) {
    return reply.status(201).send({
      message: "Erro ao criar anexo.",
    });
  }
}
