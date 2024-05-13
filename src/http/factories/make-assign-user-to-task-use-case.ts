import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";

import { AssignUserToTask } from "@/use-cases/tasks/assign-user-to-task";

export function makeAssignUserToTaskUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );
  const assignUserToTaskUseCase = new AssignUserToTask(drizzleTaskRepository);
  return assignUserToTaskUseCase;
}
