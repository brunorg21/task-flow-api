import { makeCreateUserUseCase } from "@/http/factories/make-create-user-use-case";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist-error";
import { hash } from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createUserRequestBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { email, name, password } = createUserRequestBody.parse(req.body);

  const createUserUseCase = makeCreateUserUseCase();

  try {
    const user = await createUserUseCase.execute({
      email,
      password: await hash(password, 8),
      username: name,
    });

    return reply.status(201).send({
      ...user,
      password: undefined,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}
