import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { DrizzleUserOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-user-organization-repository";

import { FindByOrganizationUseCase } from "@/use-cases/user-organization/find-by-organization";

export function makeFindByOrganizationUseCase() {
  const drizzleUserOrganizationRepository =
    new DrizzleUserOrganizationRepository();
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();

  const findByOrganizationUseCase = new FindByOrganizationUseCase(
    drizzleUserOrganizationRepository,
    drizzleOrganizationRepository
  );

  return findByOrganizationUseCase;
}
