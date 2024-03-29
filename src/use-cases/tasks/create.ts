import { ITaskCreate } from "@/models/task-model";
import { TaskRepository } from "@/repositories/task-repository";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(data: ITaskCreate) {
    const task = await this.taskRepository.create(data);

    return task;
  }
}
