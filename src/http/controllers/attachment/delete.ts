import { supabaseClient } from "@/db/supabase/client";
import { makeDeleteAttachmentUseCase } from "@/http/factories/make-delete-attachment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteAttachment(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const deleteAttachmentParamSchema = z.object({
    attachmentId: z.string(),
    fileName: z.string(),
  });

  const { attachmentId, fileName } = deleteAttachmentParamSchema.parse(
    req.params
  );

  const deleteUseCase = makeDeleteAttachmentUseCase();
  try {
    const { data, error } = await supabaseClient.storage
      .from("attachments")
      .remove([fileName]);

    if (error)
      return reply.status(400).send({
        message: error.message,
      });

    if (data) {
      await deleteUseCase.execute([attachmentId]);
    }

    return reply.status(200).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao deletar arquivo.",
    });
  }
}
