import { makeFindManyOrganizationUseCase } from "@/http/factories/make-find-many-organization-use-case";

import { FastifyReply, FastifyRequest } from "fastify";

export async function findManyOrganization(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findManyOrganization = makeFindManyOrganizationUseCase();

  try {
    const { organizations } = await findManyOrganization.execute({
      userId: req.user.sub,
    });

    return reply.status(200).send({
      organizations,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro interno do servidor.",
      error,
    });
  }
}
