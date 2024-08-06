import { makeDeleteOrganizationUseCase } from "@/http/factories/make-delete-organization-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteOrganization(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const delteOrganizationRequestParamsSchema = z.object({
    organizationId: z.string(),
  });

  const { organizationId } = delteOrganizationRequestParamsSchema.parse(
    req.params
  );

  const deletOrganizationUseCase = makeDeleteOrganizationUseCase();

  try {
    await deletOrganizationUseCase.execute(organizationId, req.user.sub);

    return reply.status(200).send();
  } catch (error) {
    console.log(error);
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(500).send({
      message: "Erro interno do servidor.",
      error: error,
    });
  }
}
