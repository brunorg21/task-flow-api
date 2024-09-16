import { makeFindManyByTaskUseCase } from "@/http/factories/make-find-many-by-task-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findManyByTask(req: FastifyRequest, reply: FastifyReply) {
  const findManyByTaskRequestBodySchema = z.object({
    taskId: z.string(),
  });

  const { taskId } = findManyByTaskRequestBodySchema.parse(req.params);

  const findManyByTask = makeFindManyByTaskUseCase();

  try {
    const notes = await findManyByTask.execute(taskId);

    return reply.status(200).send({
      notes,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro interno do servidor",
      error,
    });
  }
}
