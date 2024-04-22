import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { CreateUserOrganizationUseCase } from "@/use-cases/user-organization/create";

export function makeCreateUserOrganizationUseCase() {
  const drizzleUserRepository = new DrizzleUserRepository();
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();

  const createUserOrganization = new CreateUserOrganizationUseCase(
    drizzleUserOrganizationRepository,
    drizzleUserRepository
  );

  return createUserOrganization;
}
