import { makeFindManyByUserUseCase } from "@/http/factories/make-find-many-by-user-use-case";
import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findManyByUser(req: FastifyRequest, reply: FastifyReply) {
  const findManyByUserUseCase = makeFindManyByUserUseCase();

  const findManyByUserRequestQuerySchema = z.object({
    status: z
      .enum(["Em andamento", "Concluída", "Cancelada"])
      .nullable()
      .default(null),
    startDate: z.string().nullable().default(null),
    endDate: z.string().nullable().default(null),
  });

  try {
    const { status, endDate, startDate } =
      findManyByUserRequestQuerySchema.parse(req.query);

    const tasks = await findManyByUserUseCase.execute(
      req.user.sub,
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
