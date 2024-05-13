import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { IAttachment } from "@/models/attachment-model";

interface EditTaskUseCaseRequest {
  taskId: string;
  title: string;
  status: "Em andamento" | "Concluída" | "Cancelada";
  attachments: string[];
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

    const currentAttachments = await this.attachmentRepository.findManyByTaskId(
      taskId
    );

    const attachmentsToAdd = attachments.filter((newAttachmentId) => {
      return !currentAttachments.some(
        (attachment) => attachment.id === newAttachmentId
      );
    });

    const attachmentsToRemove = currentAttachments.filter((attachment) => {
      return !attachments.includes(attachment.id);
    });

    if (attachmentsToAdd.length > 0) {
      const currentAttachments = await this.attachmentRepository.findMany(
        attachmentsToAdd
      );
      const newAttachments = currentAttachments.map((attachment) => {
        return {
          id: attachment.id,
          fileName: attachment.fileName,
          noteId: attachment.noteId,
          taskId: task.id,
          type: attachment.type,
          url: attachment.url,
          createdAt: attachment.createdAt,
        } as IAttachment;
      });
      await this.attachmentRepository.save(newAttachments);
    }

    if (attachmentsToRemove.length > 0) {
      await this.attachmentRepository.deleteMany(
        attachmentsToRemove.map((a) => a.id)
      );
    }

    task.title = title;
    task.status = status;
    task.attachments = attachments;
    task.assignedId = assignedId;

    await this.taskRepository.save(task);
  }
}
