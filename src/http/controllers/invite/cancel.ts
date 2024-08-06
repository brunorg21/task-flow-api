import { makeCancelInviteUseCase } from "@/http/factories/make-cancel-invite-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cancelInvite(req: FastifyRequest, reply: FastifyReply) {
  const cancelInviteRequestBodySchema = z.object({
    inviteId: z.string(),
  });

  const { inviteId } = cancelInviteRequestBodySchema.parse(req.params);

  const cancelInviteUseCase = makeCancelInviteUseCase();

  try {
    await cancelInviteUseCase.execute(inviteId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }
    return reply.status(500).send({
      message: "Internal server error",
      error,
    });
  }
}
