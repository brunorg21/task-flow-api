import fastify from "fastify";
import { env } from "./env";
import { userRoutes } from "./http/controllers/user/route";
import fastifyJwt from "@fastify/jwt";
import { userOrganizationRoutes } from "./http/controllers/user-organization/route";

const app = fastify();
app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
});
app.register(userRoutes);
app.register(userOrganizationRoutes);

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("Server is running..."));
