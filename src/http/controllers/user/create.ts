import { makeUserRepository } from "@/http/factories/make-user-repository";
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

  const useCase = makeUserRepository();

  try {
    const user = await useCase.execute({
      email,
      password: await hash(password, 8),
      username: name,
    });

    console.log(user);

    return reply
      .send({
        user,
      })
      .status(201);
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return reply.send({
        message: error.message,
      });
    }
  }
}
