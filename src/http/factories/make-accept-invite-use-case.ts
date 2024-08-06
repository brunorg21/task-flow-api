import { DrizzleInviteRepository } from "@/repositories/drizzle-repositories/drizzle-invite-repository";
import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { AccepInviteUseCase } from "@/use-cases/invites/accept-invite";

export function makeAcceptInviteUseCase() {
  const drizzleInviteRepository = new DrizzleInviteRepository();
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();

  const acceptInviteUseCase = new AccepInviteUseCase(
    drizzleInviteRepository,
    drizzleUserOrganizationRepository
  );

  return acceptInviteUseCase;
}
