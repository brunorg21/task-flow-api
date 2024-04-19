import { db } from "@/db/connection";
import { userSchema } from "@/db/schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createUserRequestBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { email, name, password } = createUserRequestBody.parse(req.body);

  const user = await db.insert(userSchema).values({
    email,
    password,
    username: name,
  });

  reply
    .send({
      user,
    })
    .status(201);
}
