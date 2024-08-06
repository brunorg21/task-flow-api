import { makeCreateOrganizationUseCase } from "@/http/factories/make-create-organization-use-case";
import { OrganizationWithSameNameError } from "@/use-cases/@errors/organization-with-same-name-error";
import { createSlug } from "@/utils/create-slug";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createOrganizationUseCase = makeCreateOrganizationUseCase();

  const createOrganizationRequestBodySchema = z.object({
    name: z.string(),
  });

  try {
    const { name } = createOrganizationRequestBodySchema.parse(req.body);

    const organization = await createOrganizationUseCase.execute(
      {
        name,
        ownerId: req.user.sub,
        slug: createSlug(name),
      },
      req.user.sub
    );

    return reply.status(201).send({
      organization,
    });
  } catch (error) {
    if (error instanceof OrganizationWithSameNameError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(500).send({
      message: "Erro ao criar",
      error,
    });
  }
}
