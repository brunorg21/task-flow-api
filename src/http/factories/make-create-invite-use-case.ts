import { DrizzleInviteRepository } from "@/repositories/drizzle-repositories/drizzle-invite-repository";
import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { CreateInviteUseCase } from "@/use-cases/invites/create";

export function makeCreateInviteUseCase() {
  const drizzleInviteRepository = new DrizzleInviteRepository();
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();
  const drizzleUserRepository = new DrizzleUserRepository();

  const createInviteUseCase = new CreateInviteUseCase(
    drizzleInviteRepository,
    drizzleUserOrganizationRepository,
    drizzleUserRepository
  );

  return createInviteUseCase;
}
