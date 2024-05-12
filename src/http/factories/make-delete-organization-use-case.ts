import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { DeleteOrganizationUseCase } from "@/use-cases/organization/delete";

export function makeDeleteOrganizationUseCase() {
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();

  const deleteOrganizationUseCase = new DeleteOrganizationUseCase(
    drizzleOrganizationRepository
  );

  return deleteOrganizationUseCase;
}
