import { makeAuthenticateUseCase } from "@/http/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/use-cases/@errors/invalid-credentials";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateRequestBodySchema.parse(req.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const user = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "1d",
        },
      }
    );
    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
        cause: error.cause,
        name: error.name,
      });
    }

    return reply.status(500).send({
      message: "Erro interno do servidor.",
      error,
    });
  }
}
