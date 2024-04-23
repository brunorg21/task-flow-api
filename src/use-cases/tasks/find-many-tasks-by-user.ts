import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class FindManyTasksByUserUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string) {
    const tasks = await this.taskRepository.findManyByUser(userId);

    if (!tasks) {
      throw new ResourceNotFoundError();
    }

    return tasks;
  }
}
