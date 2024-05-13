import { makeDeleteNoteUseCase } from "@/http/factories/make-delete-note-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteNote(req: FastifyRequest, reply: FastifyReply) {
  const delteNoteRequestParamsSchema = z.object({
    noteId: z.string(),
  });

  const { noteId } = delteNoteRequestParamsSchema.parse(req.params);

  const deletNoteUseCase = makeDeleteNoteUseCase();

  try {
    await deletNoteUseCase.execute(noteId);

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(500).send({
      message: "Erro interno do servidor.",
      error: error,
    });
  }
}
