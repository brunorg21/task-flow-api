import { makeCreateUserOrganizationUseCase } from "@/http/factories/make-create-user-organization-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createUserOrganizationRequestBodySchema = z.object({
    email: z.string(),
    organizationId: z.string(),
  });

  const { organizationId, email } =
    createUserOrganizationRequestBodySchema.parse(req.body);

  try {
    const createUserOrganizationUseCase = makeCreateUserOrganizationUseCase();

    const { userOrganization } = await createUserOrganizationUseCase.execute(
      email,
      organizationId
    );

    return reply.status(200).send({
      userOrganization,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        name: error.name,
      });
    }
  }
}
