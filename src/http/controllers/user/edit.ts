import { makeEditUserUseCase } from "@/http/factories/make-edit-user-use-case";
import { InvalidCredentialsError } from "@/use-cases/@errors/invalid-credentials";
import { ResourceNotFoundError } from "@/use-cases/@errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function edit(req: FastifyRequest, reply: FastifyReply) {
  const editUserRequestBodySchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
  });

  const { email, password, username } = editUserRequestBodySchema.parse(
    req.body
  );

  const editUserUseCase = makeEditUserUseCase();

  try {
    const { user } = await editUserUseCase.execute({
      userId: req.user.sub,
      email,
      password,
      username,
    });

    return {
      user,
    };
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}
