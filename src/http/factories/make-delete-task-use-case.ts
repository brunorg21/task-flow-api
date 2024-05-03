import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { DeleteTaskUseCase } from "@/use-cases/tasks/delete";

export function makeDeleteTaskUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );

  const findTaskById = new DeleteTaskUseCase(
    drizzleTaskRepository,
    drizzleAttachmentRepository
  );

  return findTaskById;
}
