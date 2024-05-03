import { TaskRepository } from "@/repositories/task-repository";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { ITask } from "@/models/task-model";

export class FindTasksByStatus {
  constructor(private taskRepository: TaskRepository) {}

  async execute(status: string, tasks: ITask[]) {
    const filteredTasks = await this.taskRepository.findByStatus(status, tasks);

    if (!filteredTasks) {
      throw new ResourceNotFoundError();
    }

    return filteredTasks;
  }
}
