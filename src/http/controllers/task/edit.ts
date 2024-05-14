import { makeCreateTaskUseCase } from "@/http/factories/make-create-task-use-case";
import { makeEditTaskUseCase } from "@/http/factories/make-edit-task.use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function edit(req: FastifyRequest, reply: FastifyReply) {
  const editTaskRequestBodySchema = z.object({
    title: z.string(),
    assignedId: z.string().nullable().default(null),
    status: z.enum(["Em andamento", "Concluída", "Cancelada"]),
    attachments: z.array(z.string()).default([]),
  });

  const editTaskRequestParamSchema = z.object({
    id: z.string(),
  });
  const { assignedId, status, title, attachments } =
    editTaskRequestBodySchema.parse(req.body);
  const { id } = editTaskRequestParamSchema.parse(req.params);

  const editTaskUseCase = makeEditTaskUseCase();

  try {
    await editTaskUseCase.execute({
      attachments: attachments ?? null,
      status,
      taskId: id,
      title,
      assignedId,
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
