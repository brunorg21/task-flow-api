import { makeFindInvitationsSendInviteUseCase } from "@/http/factories/make-find-invitations-send-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findInvitationsSendInvite(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findInvitationsSendInviteRequestBodySchema = z.object({
    senderId: z.string(),
  });

  const { senderId } = findInvitationsSendInviteRequestBodySchema.parse(
    req.params
  );

  const findInvitationsSendInviteUseCase =
    makeFindInvitationsSendInviteUseCase();

  try {
    const { invites } = await findInvitationsSendInviteUseCase.execute(
      senderId
    );

    return reply.status(200).send({
      invites,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
      error,
    });
  }
}
