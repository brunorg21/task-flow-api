import { makeEditUserUseCase } from "@/http/factories/make-edit-user-use-case";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { UserAlreadyExistError } from "@/use-cases/@errors/user-already-exist-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function edit(req: FastifyRequest, reply: FastifyReply) {
  const editUserRequestBodySchema = z.object({
    email: z.string().email(),
    username: z.string(),
  });

  const { email, username } = editUserRequestBodySchema.parse(req.body);

  const editUserUseCase = makeEditUserUseCase();

  try {
    const { user } = await editUserUseCase.execute({
      userId: req.user.sub,
      email,
      username,
    });

    return {
      user,
    };
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }
    if (error instanceof UserAlreadyExistError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(500).send({
      message: "Erro interno do servidor.",
    });
  }
}
