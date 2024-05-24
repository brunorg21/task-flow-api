import { ITask, ITaskCreate, ITaskList } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { AttachmentRepository } from "../attachment-repository";
import { IAttachment } from "@/models/attachment-model";

export class InMemoryTaskRepository implements TaskRepository {
  public items: ITask[] = [];

  constructor(private attachmentRepository: AttachmentRepository) {}

  async create(data: ITaskCreate): Promise<ITask> {
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

    this.items.push(task);

    return task;
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
    startDate: Date | null,
    endDate: Date | null
  ): Promise<ITaskList[]> {
    let tasks: ITask[];

    tasks = this.items.filter((task) =>
      status && startDate && endDate
        ? (task.userId === userId &&
            task.status === status &&
            dayjs(task.createdAt).isAfter(startDate)) ||
          (dayjs(task.createdAt).isBefore(endDate) && task.userId)
        : status
        ? task.userId === userId && task.status === status
        : startDate && endDate
        ? (task.userId === userId &&
            dayjs(task.createdAt).isAfter(startDate)) ||
          dayjs(task.createdAt).isBefore(endDate)
        : task.userId === userId
    );

    console.log(tasks);

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
    startDate: Date | null,
    endDate: Date | null
  ): Promise<ITaskList[]> {
    let tasks: ITask[] = [];

    tasks = this.items.filter((task) =>
      status && startDate && endDate
        ? (task.organizationId === organizationId &&
            task.status === status &&
            dayjs(task.createdAt).isAfter(startDate)) ||
          (dayjs(task.createdAt).isBefore(endDate) && task.userId)
        : status
        ? task.organizationId === organizationId && task.status === status
        : startDate && endDate
        ? (task.organizationId === organizationId &&
            dayjs(task.createdAt).isAfter(startDate)) ||
          dayjs(task.createdAt).isBefore(endDate)
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
