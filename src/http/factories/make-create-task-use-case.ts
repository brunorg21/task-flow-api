import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { CreateTaskUseCase } from "@/use-cases/tasks/create";

export function makeCreateTaskUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );
  const createTaskUseCase = new CreateTaskUseCase(
    drizzleTaskRepository,
    drizzleAttachmentRepository
  );
  return createTaskUseCase;
}
