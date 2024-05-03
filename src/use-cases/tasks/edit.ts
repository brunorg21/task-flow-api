import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { IAttachment } from "@/models/attachment-model";

interface EditTaskUseCaseRequest {
  taskId: string;
  title: string;
  status: "Em andamento" | "Concluída" | "Cancelada";
  attachments: string[] | null;
  assignedId: string | null;
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
    assignedId,
  }: EditTaskUseCaseRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    if (attachments) {
      const currentAttachments = await this.attachmentRepository.findMany(
        attachments
      );

      const newAttachments = currentAttachments.map((attachment) => {
        return {
          id: attachment.id,
          fileName: attachment.fileName,
          url: attachment.url,
          taskId: task.id,
          noteId: attachment.noteId,
          createdAt: attachment.createdAt,
          type: attachment.type,
        } as IAttachment;
      });

      await this.attachmentRepository.save(newAttachments as IAttachment[]);
    }

    task.title = title;
    task.status = status;
    task.attachments = attachments;
    task.assignedId = assignedId;

    await this.taskRepository.save(task);
  }
}
