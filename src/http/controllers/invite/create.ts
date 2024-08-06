import { makeCreateInviteUseCase } from "@/http/factories/make-create-invite-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createInvite(req: FastifyRequest, reply: FastifyReply) {
  const createInviteRequestBodySchema = z.object({
    organizationId: z.string(),
    recipientId: z.string(),
    senderId: z.string(),
  });

  const { organizationId, recipientId, senderId } =
    createInviteRequestBodySchema.parse(req.body);

  const createInviteUseCase = makeCreateInviteUseCase();

  try {
    const invite = await createInviteUseCase.execute({
      organizationId,
      recipientId,
      senderId,
    });

    return reply.status(201).send({
      invite,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Internal server error",
      error,
    });
  }
}
