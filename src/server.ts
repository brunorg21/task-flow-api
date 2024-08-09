import fastify from "fastify";
import { env } from "./env";
import { userRoutes } from "./http/controllers/user/route";
import fastifyJwt from "@fastify/jwt";
import { userOrganizationRoutes } from "./http/controllers/user-organization/route";
import { taskRoutes } from "./http/controllers/task/route";
import fastifyMultipart from "@fastify/multipart";
import { attachmentRoutes } from "./http/controllers/attachment/route";
import { organizationRoutes } from "./http/controllers/organization/route";
import { noteRoutes } from "./http/controllers/note/route";
import { ZodError } from "zod";
import cors from "@fastify/cors";
import { inviteRoutes } from "./http/controllers/invite/route";

const app = fastify();

app.register(cors, {
  origin: "http://localhost:3000",
});

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
  sign: {
    expiresIn: "1d",
  },
});

app.register(fastifyMultipart);

//Routes
app.register(userRoutes);
app.register(userOrganizationRoutes);
app.register(taskRoutes);
app.register(attachmentRoutes);
app.register(organizationRoutes);
app.register(noteRoutes);
app.register(inviteRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    console.error(error);
  }

  return reply.status(500).send({
    message: "Erro interno servidor",
    error,
  });
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("Server is running..."));
