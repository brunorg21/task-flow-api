import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { FindUniqueOrganizationUseCase } from "@/use-cases/organization/find-unique-organization";

export function makeFindUniqueOrganizationUseCase() {
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();

  const findUniqueOrganizationUseCase = new FindUniqueOrganizationUseCase(
    drizzleOrganizationRepository
  );

  return findUniqueOrganizationUseCase;
}
