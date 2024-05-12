import { makeFindUniqueOrganizationUseCase } from "@/http/factories/make-find-unique-organization-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findUniqueOrganization(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findUniqueOrganizationRequestParamsSchema = z.object({
    organizationId: z.string(),
  });

  const { organizationId } = findUniqueOrganizationRequestParamsSchema.parse(
    req.params
  );

  const findUniqueOrganization = makeFindUniqueOrganizationUseCase();

  try {
    const organization = await findUniqueOrganization.execute(organizationId);

    return reply.status(200).send({
      organization,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(500).send({
      message: "Erro interno do servidor.",
      error,
    });
  }
}
