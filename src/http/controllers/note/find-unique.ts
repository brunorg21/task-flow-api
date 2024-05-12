import { makeFindUniqueNoteUseCase } from "@/http/factories/make-find-unique-note";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findUnique(req: FastifyRequest, reply: FastifyReply) {
  const findUniqueRequestBodySchema = z.object({
    noteId: z.string(),
  });

  const { noteId } = findUniqueRequestBodySchema.parse(req.params);

  const findUniqueNoteUseCase = makeFindUniqueNoteUseCase();

  try {
    const note = await findUniqueNoteUseCase.execute(noteId);

    return reply.status(201).send({
      note,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
      });
    }
    return reply.status(500).send({
      message: "Erro interno do servidor",
      error,
    });
  }
}
