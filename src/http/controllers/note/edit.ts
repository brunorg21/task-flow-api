import { makeEditNoteUseCase } from "@/http/factories/make-edit-note-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editNote(req: FastifyRequest, reply: FastifyReply) {
  const editNoteRequestBodySchema = z.object({
    description: z.string(),
    attachments: z.array(z.string()).nullable().default(null),
  });

  const editNoteRequestParamSchema = z.object({
    noteId: z.string(),
  });
  const { description, attachments } = editNoteRequestBodySchema.parse(
    req.body
  );
  const { noteId } = editNoteRequestParamSchema.parse(req.params);

  const editNoteUseCase = makeEditNoteUseCase();

  try {
    await editNoteUseCase.execute({
      attachments: attachments ?? [],
      description,
      noteId,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(400).send({
      message: "Não foi possivel editar",
      erro: error,
    });
  }
}
