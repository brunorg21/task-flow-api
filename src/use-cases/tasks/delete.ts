import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    await this.taskRepository.delete(task.id);
  }
}
