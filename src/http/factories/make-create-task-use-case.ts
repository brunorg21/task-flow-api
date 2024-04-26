import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleTaskRepository } from "@/repositories/drizzle-repositories/drizzle-task-repository";
import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { CreateTaskUseCase } from "@/use-cases/tasks/create";
import { AuthenticateUseCase } from "@/use-cases/users/authenticate";

export function makeCreateTaskUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleTaskRepository(
    drizzleAttachmentRepository
  );
  const createTaskUseCase = new CreateTaskUseCase(drizzleTaskRepository);
  return createTaskUseCase;
}
