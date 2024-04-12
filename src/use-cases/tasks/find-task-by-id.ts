import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class FindTaskByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    return task;
  }
}
