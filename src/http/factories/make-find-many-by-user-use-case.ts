import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { FindManyTasksByUserUseCase } from "@/use-cases/tasks/find-many-tasks-by-user";

export function makeFindManyByUserUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );

  const findManyByUser = new FindManyTasksByUserUseCase(drizzleTaskRepository);

  return findManyByUser;
}
