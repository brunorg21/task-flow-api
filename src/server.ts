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

const app = fastify();

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

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("Server is running..."));
