import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class FindTaskByIdUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    const attachments = await this.attachmentRepository?.findManyByTaskId(id);

    return {
      id: task.id,
      title: task.title,
      createdAt: task.createdAt,
      userId: task.userId,
      organizationId: task.organizationId,
      assignedId: task.assignedId,
      status: task.status,
      attachments,
    };
  }
}
