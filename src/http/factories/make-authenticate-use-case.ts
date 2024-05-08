import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { AuthenticateUseCase } from "@/use-cases/users/authenticate";

export function makeAuthenticateUseCase() {
  const drizzleUserRepository = new DrizzleUserRepository();
  const drizzleUserOrganization = new DrizzleUserOrganizationRepository();
  const authenticateUseCase = new AuthenticateUseCase(
    drizzleUserRepository,
    drizzleUserOrganization
  );
  return authenticateUseCase;
}
