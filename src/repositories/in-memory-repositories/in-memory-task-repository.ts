import { ITask, ITaskCreate } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { AttachmentRepository } from "../attachment-repository";

export class InMemoryTaskRepository implements TaskRepository {
  public items: ITask[] = [];

  constructor(private attachmentRepository: AttachmentRepository) {}

  async create(data: ITaskCreate): Promise<ITask> {
    const task = {
      id: randomUUID(),
      assignedId: data.assignedId,
      attachments: data.attachments,
      createdAt: data.createdAt,
      noteId: data.noteId,
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
  async findManyByUser(userId: string): Promise<ITask[] | null> {
    const tasks = this.items.filter((task) => task.userId === userId);

    if (tasks.length === 0) {
      return null;
    }

    return tasks;
  }
  async findManyByOrganization(
    organizationId: string
  ): Promise<ITask[] | null> {
    const tasks = this.items.filter(
      (task) => task.organizationId === organizationId
    );

    if (tasks.length === 0) {
      return null;
    }

    return tasks;
  }
  async findByStatus(status: string): Promise<ITask[] | null> {
    const tasks = this.items.filter((task) => task.status === status);

    if (tasks.length === 0) {
      return null;
    }

    return tasks;
  }
  async findByDate(date: Date): Promise<ITask[] | null> {
    const tasks = this.items.filter(
      (task) =>
        dayjs(task.createdAt).isBefore(date) ||
        dayjs(task.createdAt).isSame(date)
    );

    if (tasks.length === 0) {
      return null;
    }

    return tasks;
  }

  async assignUserToTask(userId: string, task: ITask): Promise<ITask> {
    task.assignedId = userId;

    return task;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);

    this.attachmentRepository.deleteManyByTaskId(id);
  }

  async save(task: ITask): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id);

    this.items[taskIndex] = task;
  }
}
