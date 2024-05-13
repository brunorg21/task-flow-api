import { makeEditOrganizationUseCase } from "@/http/factories/make-edit-organization-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function edit(req: FastifyRequest, reply: FastifyReply) {
  const editOrganizationRequestBodySchema = z.object({
    name: z.string(),
  });

  const editOrganizationRequestParamSchema = z.object({
    organizationId: z.string(),
  });
  const { name } = editOrganizationRequestBodySchema.parse(req.body);
  const { organizationId } = editOrganizationRequestParamSchema.parse(
    req.params
  );

  const editOrganizationUseCase = makeEditOrganizationUseCase();

  try {
    await editOrganizationUseCase.execute({
      name,
      organizationId,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(400).send({
      message: "Não foi possivel editar",
      erro: error,
    });
  }
}
