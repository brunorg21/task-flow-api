import { TaskRepository } from "@/repositories/task-repository";

import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class FindTasksByStatus {
  constructor(private taskRepository: TaskRepository) {}

  async execute(status: string) {
    const tasks = await this.taskRepository.findByStatus(status);

    if (!tasks) {
      throw new ResourceNotFoundError();
    }

    return tasks;
  }
}
