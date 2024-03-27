import { TaskRepository } from "@/repositories/task-repository";
import { TaskNotFoundError } from "../errors/task-not-found-error";
import { ITask } from "@/models/task-model";

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
      throw new TaskNotFoundError();
    }

    return {
      tasks,
    };
  }
}
