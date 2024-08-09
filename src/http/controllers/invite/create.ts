import { makeCreateInviteUseCase } from "@/http/factories/make-create-invite-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { UserInSameOrganizationError } from "@/use-cases/@errors/user-in-same-organization-error";
import { UserNotFoundError } from "@/use-cases/@errors/user-not-found-error";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createInvite(req: FastifyRequest, reply: FastifyReply) {
  const createInviteRequestBodySchema = z.object({
    organizationId: z.string(),
    email: z.string(),
  });

  const { organizationId, email } = createInviteRequestBodySchema.parse(
    req.body
  );

  const createInviteUseCase = makeCreateInviteUseCase();

  try {
    const invite = await createInviteUseCase.execute({
      organizationId,
      email,
      senderId: req.user.sub,
    });

    return reply.status(201).send({
      invite,
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }
    if (error instanceof UserInSameOrganizationError) {
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
