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
  });

  const { attachmentId } = deleteAttachmentParamSchema.parse(req.params);

  const deleteUseCase = makeDeleteAttachmentUseCase();
  try {
    await deleteUseCase.execute([attachmentId]);

    return reply.status(200).send();
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao deletar arquivo.",
      error,
    });
  }
}
