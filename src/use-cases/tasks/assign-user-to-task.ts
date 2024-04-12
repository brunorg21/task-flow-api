import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface AssignUserToTaskUseCaseRequest {
  userId: string;
  taskId: string;
}

export class AssignUserToTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ userId, taskId }: AssignUserToTaskUseCaseRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    const assignTask = await this.taskRepository.assignUserToTask(userId, task);

    return {
      assignTask,
    };
  }
}
