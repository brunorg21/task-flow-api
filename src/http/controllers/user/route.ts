import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { edit } from "./edit";
import { deleteUser } from "./delete";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", create);
  app.post("/authenticate", authenticate);

  //Auth route

  app.get(
    "/me",
    {
      onRequest: [jwtVerify],
    },
    profile
  );
  app.put(
    "/user",
    {
      onRequest: [jwtVerify],
    },
    edit
  );

  app.delete(
    "/user:id",
    {
      onRequest: [jwtVerify],
    },
    deleteUser
  );
}
