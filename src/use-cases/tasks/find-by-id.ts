import { TaskRepository } from "@/repositories/task-repository";
import { TaskNotFoundError } from "../errors/task-not-found.-error";

export class FindByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new TaskNotFoundError();
    }

    return task;
  }
}
