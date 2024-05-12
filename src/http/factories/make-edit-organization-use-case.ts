import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleOrganizationRepository } from "@/repositories/drizzle-repositories/drizzle-organization-repository";
import { EditOrganizationUseCase } from "@/use-cases/organization/edit";

export function makeEditOrganizationUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleOrganizationRepository = new DrizzleOrganizationRepository();

  const editOrganizationUseCase = new EditOrganizationUseCase(
    drizzleOrganizationRepository
  );

  return editOrganizationUseCase;
}
