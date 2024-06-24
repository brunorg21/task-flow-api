import { makeCreateUserUseCase } from "@/http/factories/make-create-user-use-case";
import { UserAlreadyExistError } from "@/use-cases/@errors/user-already-exist-error";
import { hash } from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createUserRequestBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5, {
      message: "Senha deve conter no minímo 5 caracteres",
    }),
  });

  const { email, username, password } = createUserRequestBody.parse(req.body);

  const createUserUseCase = makeCreateUserUseCase();

  try {
    const user = await createUserUseCase.execute({
      email,
      password: await hash(password, 8),
      username,
    });

    return reply.status(201).send({
      ...user,
      password: undefined,
    });
  } catch (error) {
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
