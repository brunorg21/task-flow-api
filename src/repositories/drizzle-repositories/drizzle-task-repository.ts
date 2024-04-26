import { ITaskCreate, ITask } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { db } from "@/db/connection";
import { taskSchema } from "@/db/schemas";
import { AttachmentRepository } from "../attachment-repository";
import { IAttachment } from "@/models/attachment-model";

export class DrizzleTaskRepository implements TaskRepository {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async create(data: ITaskCreate): Promise<void> {
    const task = await db
      .insert(taskSchema)
      .values({
        title: data.title,
        userId: data.userId,
        assignedId: data.assignedId,
        createdAt: new Date(),
        status: data.status,
        organizationId: data.organizationId,
      })
      .returning({
        id: taskSchema.id,
      });

    if (data.attachments) {
      const attachments = await this.attachmentRepository.findMany(
        data.attachments
      );

      const newAttachments = attachments.map((attachment) => {
        return {
          id: attachment.id,
          fileName: attachment.fileName,
          url: attachment.url,
          taskId: task[0].id,
          noteId: attachment.noteId,
          createdAt: attachment.createdAt,
          type: attachment.type,
        } as IAttachment;
      });

      await this.attachmentRepository.save(newAttachments);
    }
  }
  save(task: ITask): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(taskId: string): Promise<ITask | null> {
    throw new Error("Method not implemented.");
  }
  findManyByUser(userId: string): Promise<ITask[] | null> {
    throw new Error("Method not implemented.");
  }
  findManyByOrganization(organizationId: string): Promise<ITask[] | null> {
    throw new Error("Method not implemented.");
  }
  findByStatus(status: string): Promise<ITask[] | null> {
    throw new Error("Method not implemented.");
  }
  findByDate(date: Date): Promise<ITask[] | null> {
    throw new Error("Method not implemented.");
  }
  assignUserToTask(userId: string, task: ITask): Promise<ITask> {
    throw new Error("Method not implemented.");
  }
}
