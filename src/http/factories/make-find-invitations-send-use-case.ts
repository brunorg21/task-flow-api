import { DrizzleInviteRepository } from "@/repositories/drizzle-repositories/drizzle-invite-repository";

import { FindInvitationsSendUseCase } from "@/use-cases/invites/find-invitations-send";

export function makeFindInvitationsSendInviteUseCase() {
  const drizzleInviteRepository = new DrizzleInviteRepository();

  const findinvitationsSendInviteUseCase = new FindInvitationsSendUseCase(
    drizzleInviteRepository
  );

  return findinvitationsSendInviteUseCase;
}
