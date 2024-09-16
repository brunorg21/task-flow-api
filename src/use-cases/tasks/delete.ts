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
    const attachments = await this.attachmentRepository.findManyByTaskId(
      task.id
    );

    if (attachments && attachments.length > 0) {
      await this.attachmentRepository.deleteMany(
        attachments.map((attachment) => attachment.id)
      );
    }

    await this.taskRepository.delete(task.id);
  }
}
