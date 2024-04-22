import { FastifyInstance } from "fastify";
import { create } from "./create";
import { jwtVerify } from "@/http/middlewares/jwt-verify";

export async function userOrganizationRoutes(app: FastifyInstance) {
  app.post(
    "/userOrganization",
    {
      onRequest: [jwtVerify],
    },
    create
  );
}
