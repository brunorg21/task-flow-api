import { DrizzleInviteRepository } from "@/repositories/drizzle-repositories/drizzle-invite-repository";
import { FindInvitationsReceivedUseCase } from "@/use-cases/invites/find-invitations-received";

export function makeFindInvitationsReceivedInviteUseCase() {
  const drizzleInviteRepository = new DrizzleInviteRepository();

  const findinvitationsreceivedInviteUseCase =
    new FindInvitationsReceivedUseCase(drizzleInviteRepository);

  return findinvitationsreceivedInviteUseCase;
}
