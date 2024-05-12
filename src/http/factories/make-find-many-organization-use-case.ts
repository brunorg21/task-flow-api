import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";
import { FindManyOrganizationUseCase } from "@/use-cases/organization/find-many-organizations";

export function makeFindManyOrganizationUseCase() {
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();

  const findManyOrganizationUseCase = new FindManyOrganizationUseCase(
    drizzleOrganizationRepository,
    drizzleUserOrganizationRepository
  );

  return findManyOrganizationUseCase;
}
