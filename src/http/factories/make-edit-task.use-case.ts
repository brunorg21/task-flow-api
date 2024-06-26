import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { EditTaskUseCase } from "@/use-cases/tasks/edit";

export function makeEditTaskUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );

  const editTaskUseCase = new EditTaskUseCase(
    drizzleTaskRepository,
    drizzleAttachmentRepository
  );

  return editTaskUseCase;
}
