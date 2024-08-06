import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { DeleteOrganizationUseCase } from "@/use-cases/organization/delete";

export function makeDeleteOrganizationUseCase() {
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();

  const deleteOrganizationUseCase = new DeleteOrganizationUseCase(
    drizzleOrganizationRepository,
    drizzleUserOrganizationRepository
  );

  return deleteOrganizationUseCase;
}
