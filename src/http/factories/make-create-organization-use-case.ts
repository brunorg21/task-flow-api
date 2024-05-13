import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { CreateOrganizationUseCase } from "@/use-cases/organization/create";

export function makeCreateOrganizationUseCase() {
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();

  const useCase = new CreateOrganizationUseCase(
    drizzleOrganizationRepository,
    drizzleUserOrganizationRepository
  );

  return useCase;
}
