import { makeCreateUserOrganizationUseCase } from "@/http/factories/make-create-user-organization-use-case";
import { makeFindByOrganizationUseCase } from "@/http/factories/make-find-by-organization-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findByOrganization(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findByOrganizationRequestParamsSchema = z.object({
    slug: z.string(),
  });

  const { slug } = findByOrganizationRequestParamsSchema.parse(req.params);

  try {
    const findByOrganizationUseCase = makeFindByOrganizationUseCase();

    const { usersOrganization } = await findByOrganizationUseCase.execute(slug);

    const users =
      usersOrganization.map((item) => {
        return {
          ...item.user,
          password: undefined,
        };
      }) ?? [];

    return reply.status(200).send({
      users,
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
