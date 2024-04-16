import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { IAttachment } from "@/models/attachment-model";

interface EditTaskUseCaseRequest {
  taskId: string;
  title: string;
  status: "Em andamento" | "Concluída" | "Cancelada";
  attachments: string[];
}

export class EditTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute({
    title,
    taskId,
    status,
    attachments,
  }: EditTaskUseCaseRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    if (attachments) {
      const newAttachments = await Promise.all(
        attachments.map(async (attachmentId) => {
          return {
            attachmentId,
            createdAt: new Date(),
            taskId: task.id,
          };
        })
      );

      await this.attachmentRepository.save(newAttachments as IAttachment[]);
    }

    task.title = title;
    task.status = status;
    task.attachments = attachments;

    await this.taskRepository.save(task);
  }
}
