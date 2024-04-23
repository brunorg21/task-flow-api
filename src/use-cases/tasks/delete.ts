import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    if (task.attachments) {
      await this.attachmentRepository.deleteMany(task.attachments);
    }

    await this.taskRepository.delete(task.id);
  }
}
