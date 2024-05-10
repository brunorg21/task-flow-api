import { ITask, ITaskCreate, ITaskList } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { AttachmentRepository } from "../attachment-repository";
import { IAttachment } from "@/models/attachment-model";

export class InMemoryTaskRepository implements TaskRepository {
  public items: ITask[] = [];

  constructor(private attachmentRepository: AttachmentRepository) {}

  async create(data: ITaskCreate): Promise<void> {
    const task = {
      id: randomUUID(),
      assignedId: data.assignedId,
      attachments: data.attachments,
      createdAt: data.createdAt,
      organizationId: data.organizationId,
      status: "Em andamento",
      title: data.title,
      userId: data.userId,
    } as ITask;

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

    this.items.push(task);
  }
  async findById(taskId: string): Promise<ITask | null> {
    const task = this.items.find((task) => task.id === taskId);

    if (!task) {
      return null;
    }

    return task;
  }
  async findManyByUser(
    userId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ): Promise<ITaskList[]> {
    let tasks: ITask[];

    tasks = this.items.filter((task) =>
      status && date
        ? (task.userId === userId &&
            task.status === status &&
            dayjs(task.createdAt).isBefore(date)) ||
          (dayjs(task.createdAt).isSame(date) && task.userId)
        : status
        ? task.userId === userId && task.status === status
        : date
        ? task.userId === userId && dayjs(task.createdAt).isBefore(date)
        : task.userId === userId
    );

    return await Promise.all(
      tasks.map(async (task) => {
        const attachments = await this.attachmentRepository.findManyByTaskId(
          task.id
        );

        return {
          id: task.id,
          assignedId: task.assignedId,
          organizationId: task.organizationId,
          title: task.title,
          userId: task.userId,
          attachments,
          createdAt: task.createdAt,
          status: task.status,
        } as ITaskList;
      })
    );
  }
  async findManyByOrganization(
    organizationId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ): Promise<ITaskList[]> {
    let tasks: ITask[] = [];

    tasks = this.items.filter((task) =>
      status && date
        ? (task.organizationId === organizationId &&
            task.status === status &&
            dayjs(task.createdAt).isBefore(date)) ||
          (dayjs(task.createdAt).isSame(date) && task.userId)
        : status
        ? task.organizationId === organizationId && task.status === status
        : date
        ? task.organizationId === organizationId &&
          dayjs(task.createdAt).isBefore(date)
        : task.organizationId === organizationId
    );

    return await Promise.all(
      tasks.map(async (task) => {
        const attachments = await this.attachmentRepository?.findManyByTaskId(
          task.id
        );

        return {
          id: task.id,
          assignedId: task.assignedId,
          organizationId: task.organizationId,
          title: task.title,
          userId: task.userId,
          attachments,
          createdAt: task.createdAt,
          status: task.status,
        } as ITaskList;
      })
    );
  }

  async assignUserToTask(userId: string, task: ITask): Promise<ITask> {
    task.assignedId = userId;

    return task;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }

  async save(task: ITask): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id);

    this.items[taskIndex] = task;
  }
}
