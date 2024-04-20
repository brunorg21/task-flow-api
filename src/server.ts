import fastify from "fastify";
import { env } from "./env";
import { userRoutes } from "./http/controllers/user/route";
import fastifyJwt from "@fastify/jwt";

const app = fastify();
app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
});
app.register(userRoutes);

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("Server is running..."));
