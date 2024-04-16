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
      data.attachments?.map((attachmentId) => {
        return this.attachmentRepository.create({
          createdAt: new Date(),
          taskId: task.id,
          attachmentId,
        });
      });
    }

    return task;
  }
}
