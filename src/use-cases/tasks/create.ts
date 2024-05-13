import { IAttachment } from "@/models/attachment-model";
import { ITaskCreate } from "@/models/task-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { TaskRepository } from "@/repositories/task-repository";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(data: ITaskCreate) {
    const task = await this.taskRepository.create(data);

    if (data.attachments) {
      const attachments = await this.attachmentRepository.findMany(
        data.attachments
      );

      const newAttachments = attachments.map((attachment) => {
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

      await this.attachmentRepository.save(newAttachments);
    }
  }
}
