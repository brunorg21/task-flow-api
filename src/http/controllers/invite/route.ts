import { jwtVerify } from "@/http/middlewares/jwt-verify";
import { FastifyInstance } from "fastify";
import { createInvite } from "./create";
import { cancelInvite } from "./cancel";
import { acceptInvite } from "./accept-invite";
import { findInvitationsReceivedInvite } from "./find-invitations-received";
import { findInvitationsSendInvite } from "./find-invitations-send";

export async function inviteRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("/invites", createInvite);
  app.delete("/invites/cancel/:inviteId", cancelInvite);
  app.patch("/invites/:inviteId", acceptInvite);
  app.get("/invites/received", findInvitationsReceivedInvite);
  app.get("/invites/sended", findInvitationsSendInvite);
}
