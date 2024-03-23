import { TaskRepository } from "@/repositories/task-repository";
import { TaskNotFoundError } from "../errors/task-not-found-error";

export class FindTasksByStatus {
  constructor(private taskRepository: TaskRepository) {}

  async execute(status: string) {
    const tasks = await this.taskRepository.findByStatus(status);

    if (!tasks) {
      throw new TaskNotFoundError();
    }

    return tasks;
  }
}
