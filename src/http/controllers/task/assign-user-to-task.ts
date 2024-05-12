import { makeAssignUserToTaskUseCase } from "@/http/factories/make-assign-user-to-task-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function assignUserToTask(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const assignUserToTaskRequestBodySchema = z.object({
    taskId: z.string(),
    userId: z.string(),
  });

  const { taskId, userId } = assignUserToTaskRequestBodySchema.parse(req.body);

  const assignUserToTaskUseCase = makeAssignUserToTaskUseCase();

  try {
    await assignUserToTaskUseCase.execute({
      taskId,
      userId,
    });

    return reply.status(200).send();
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
