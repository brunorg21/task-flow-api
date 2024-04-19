import fastify from "fastify";
import { env } from "./env";
import { userRoutes } from "./http/controllers/user/route";

const app = fastify();

app.register(userRoutes);

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("Server is running..."));
