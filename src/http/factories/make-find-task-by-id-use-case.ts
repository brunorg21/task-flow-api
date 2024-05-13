import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { FindTaskByIdUseCase } from "@/use-cases/tasks/find-task-by-id";

export function makeFindTaskByIdUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );

  const findTaskById = new FindTaskByIdUseCase(
    drizzleTaskRepository,
    drizzleAttachmentRepository
  );

  return findTaskById;
}
