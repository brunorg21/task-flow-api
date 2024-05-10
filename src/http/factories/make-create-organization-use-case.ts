import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { CreateOrganizationUseCase } from "@/use-cases/organization/create";

export function makeCreateOrganizationUseCase() {
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();

  const useCase = new CreateOrganizationUseCase(drizzleOrganizationRepository);

  return useCase;
}
