import { makeCreateOrganizationUseCase } from "@/http/factories/make-create-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createOrganizationUseCase = makeCreateOrganizationUseCase();

  const createOrganizationRequestBodySchema = z.object({
    name: z.string(),
  });

  try {
    const { name } = createOrganizationRequestBodySchema.parse(req.body);

    const organization = await createOrganizationUseCase.execute({
      name,
    });

    return reply.status(201).send({
      organization,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao criar",
      error,
    });
  }
}
