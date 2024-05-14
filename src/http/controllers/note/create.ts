import { makeCreateNoteUseCase } from "@/http/factories/make-create-note-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createNoteRequestBodySchema = z.object({
    description: z.string(),
    taskId: z.string(),
    attachments: z.array(z.string()).default([]),
  });

  const { description, taskId, attachments } =
    createNoteRequestBodySchema.parse(req.body);

  const createNoteUseCase = makeCreateNoteUseCase();

  try {
    const note = await createNoteUseCase.execute({
      authorId: req.user.sub,
      description,
      taskId,
      attachments,
    });

    return reply.status(201).send({
      note,
    });
  } catch (error) {
    return reply.status(400).send({
      message: "Não foi possível criar",
      error,
    });
  }
}
