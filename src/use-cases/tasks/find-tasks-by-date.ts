import { TaskRepository } from "@/repositories/task-repository";

import { ITask } from "@/models/task-model";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FindTaskByDateUseCaseRequest {
  date: Date;
}

interface FindTaskByDateUseCaseResponse {
  tasks: ITask[];
}

export class FindTaskByDate {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    date,
  }: FindTaskByDateUseCaseRequest): Promise<FindTaskByDateUseCaseResponse> {
    const tasks = await this.taskRepository.findByDate(date);

    if (!tasks) {
      throw new ResourceNotFoundError();
    }

    return {
      tasks,
    };
  }
}
