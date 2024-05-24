import { makeFindManyTaskByOrganizationUseCase } from "@/http/factories/make-find-many-task-by-organization-use-case";
import dayjs from "dayjs";
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
    startDate: z.string().nullable().default(null),
    endDate: z.string().nullable().default(null),
  });

  const findManyTaskByOrganizationRequestParamSchema = z.object({
    organizationId: z.string(),
  });

  try {
    const { status, endDate, startDate } =
      findManyTaskByOrganizationRequestQuerySchema.parse(req.query);

    const { organizationId } =
      findManyTaskByOrganizationRequestParamSchema.parse(req.params);

    const tasks = await findManyTaskByOrganization.execute(
      organizationId,
      status,
      startDate ? dayjs(startDate).toDate() : null,
      endDate ? dayjs(endDate).toDate() : null
    );

    return reply.status(200).send({
      tasks,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro interno do servidor.",
      error,
    });
  }
}
