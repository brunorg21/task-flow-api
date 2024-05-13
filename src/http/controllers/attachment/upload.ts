import { supabaseClient } from "@/db/supabase/client";
import { makeCreateAttachmentUseCase } from "@/http/factories/make-create-attachment-use-case";
import { makeUploadAttachment } from "@/http/factories/make-upload-attachment-use-case";
import { IAttachmentCreate } from "@/models/attachment-model";
import { InvalidAttachmentTypeError } from "@/use-cases/@errors/invalid-attachment-type-error";
import { UploadError } from "@/use-cases/@errors/upload-error";
import { FastifyRequest, FastifyReply } from "fastify";

export async function upload(req: FastifyRequest, reply: FastifyReply) {
  const parts = req.files();
  let attachments: IAttachmentCreate[] = [];
  for await (const part of parts) {
    try {
      const uploadAttachment = makeUploadAttachment();
      const buffer = await part.toBuffer();
      const { data } = await uploadAttachment.execute({
        buffer,
        fileName: part.filename,
        fileType: part.mimetype,
      });

      if (data)
        attachments.push({
          fileName: part.filename,
          noteId: null,
          taskId: null,
          type: part.mimetype,
          url: data.path,
        });
    } catch (error) {
      if (error instanceof InvalidAttachmentTypeError) {
        return reply.status(400).send({
          message: error.message,
          cause: error.cause,
        });
      }

      if (error instanceof UploadError) {
        return reply.status(406).send({
          message: error.message,
          cause: error.cause,
        });
      }

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
