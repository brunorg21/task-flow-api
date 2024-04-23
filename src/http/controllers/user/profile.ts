import { makeProfileUseCase } from "@/http/factories/make-profile-use-case";
import { InvalidCredentialsError } from "@/use-cases/@errors/invalid-credentials";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getProfileUseCase = makeProfileUseCase();

  try {
    const { user } = await getProfileUseCase.execute({
      userId: req.user.sub,
    });

    return reply.status(200).send({
      ...user,
      password: undefined,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      });
    }
  }
}
