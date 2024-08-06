import { makeFindInvitationsReceivedInviteUseCase } from "@/http/factories/make-find-invitations-received-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findInvitationsReceivedInvite(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findInvitationsReceivedInviteRequestBodySchema = z.object({
    recipientId: z.string(),
  });

  const { recipientId } = findInvitationsReceivedInviteRequestBodySchema.parse(
    req.params
  );

  const findInvitationsReceivedInviteUseCase =
    makeFindInvitationsReceivedInviteUseCase();

  try {
    const { invites } = await findInvitationsReceivedInviteUseCase.execute(
      recipientId
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
