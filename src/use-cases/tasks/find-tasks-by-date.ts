import { TaskRepository } from "@/repositories/task-repository";

import { ITask } from "@/models/task-model";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface FindTaskByDateUseCaseRequest {
  date: Date;
  tasks: ITask[];
}

interface FindTaskByDateUseCaseResponse {
  filteredTasks: ITask[];
}

export class FindTaskByDate {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    date,
    tasks,
  }: FindTaskByDateUseCaseRequest): Promise<FindTaskByDateUseCaseResponse> {
    const filteredTasks = await this.taskRepository.findByDate(date, tasks);

    if (!filteredTasks) {
      throw new ResourceNotFoundError();
    }

    return {
      filteredTasks,
    };
  }
}
