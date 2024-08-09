import { makeFindInvitationsReceivedInviteUseCase } from "@/http/factories/make-find-invitations-received-use-case";

import { FastifyReply, FastifyRequest } from "fastify";

export async function findInvitationsReceivedInvite(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findInvitationsReceivedInviteUseCase =
    makeFindInvitationsReceivedInviteUseCase();

  try {
    const { invites } = await findInvitationsReceivedInviteUseCase.execute(
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
