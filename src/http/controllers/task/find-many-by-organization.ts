import { makeFindManyTaskByOrganizationUseCase } from "@/http/factories/make-find-many-task-by-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findManyByOrganization(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findManyTaskByOrganization = makeFindManyTaskByOrganizationUseCase();

  const findManyTaskByOrganizationRequestQuerySchema = z.object({
    status: z
      .enum(["Em andamento", "Concluída", "Cancelada"])
      .nullable()
      .default(null),
    date: z.date().nullable().default(null),
  });

  try {
    const { status, date } = findManyTaskByOrganizationRequestQuerySchema.parse(
      req.query
    );
    const tasks = await findManyTaskByOrganization.execute(
      req.user.organizationId!,
      status,
      date
    );

    return reply.status(200).send({
      tasks,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro interno do servidor.",
    });
  }
}
