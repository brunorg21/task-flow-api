import { makeCreateTaskUseCase } from "@/http/factories/make-create-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createTaskRequestBodySchema = z.object({
    title: z.string(),
    organizationId: z.string().uuid().nullable().default(null),
    assignedId: z.string().uuid().nullable().default(null),
    status: z.enum(["Em andamento", "Concluída", "Cancelada"]),
    attachments: z.array(z.string()).nullable().default(null),
  });

  const { assignedId, organizationId, status, title, attachments } =
    createTaskRequestBodySchema.parse(req.body);

  const createTaskUseCase = makeCreateTaskUseCase();

  try {
    await createTaskUseCase.execute({
      assignedId,
      attachments,
      organizationId,
      title,
      userId: req.user.sub,
      status,
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(400).send({
      message: "Não foi possível criar",
      error,
    });
  }
}
