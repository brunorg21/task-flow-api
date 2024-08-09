import { makeFindInvitationsSendInviteUseCase } from "@/http/factories/make-find-invitations-send-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findInvitationsSendInvite(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findInvitationsSendInviteUseCase =
    makeFindInvitationsSendInviteUseCase();

  try {
    const { invites } = await findInvitationsSendInviteUseCase.execute(
      req.user.sub
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
