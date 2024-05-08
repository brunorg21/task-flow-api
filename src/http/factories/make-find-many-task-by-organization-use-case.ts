import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { FindManyTasksByOrganizationUseCase } from "@/use-cases/tasks/find-many-tasks-by-organization";
import { FindTaskByIdUseCase } from "@/use-cases/tasks/find-task-by-id";

export function makeFindManyTaskByOrganizationUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );

  const findManyByOrganization = new FindManyTasksByOrganizationUseCase(
    drizzleTaskRepository
  );

  return findManyByOrganization;
}
