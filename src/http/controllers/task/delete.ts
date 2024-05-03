import { makeDeleteTaskUseCase } from "@/http/factories/make-delete-task-use-case";
import { makeFindTaskByIdUseCase } from "@/http/factories/make-find-task-by-id-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteTask(req: FastifyRequest, reply: FastifyReply) {
  const delteTaskRequestParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = delteTaskRequestParamsSchema.parse(req.params);

  const deletTaskUseCase = makeDeleteTaskUseCase();

  try {
    await deletTaskUseCase.execute(id);

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
