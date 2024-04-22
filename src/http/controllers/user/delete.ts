import { makeDeleteUserUseCase } from "@/http/factories/make-delete-user-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const deleteUserUseCase = makeDeleteUserUseCase();

  const deleteUserRequestParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteUserRequestParamsSchema.parse(req.params);

  try {
    await deleteUserUseCase.execute(id);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}
