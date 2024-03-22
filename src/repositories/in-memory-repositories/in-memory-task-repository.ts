import { ITask, ITaskCreate } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { randomUUID } from "crypto";

export class InMemoryTaskRepository implements TaskRepository {
  public items: ITask[] = [];

  async create(data: ITaskCreate): Promise<ITask> {
    const task = {
      id: randomUUID(),
      assignedId: data.assignedId,
      attachment: data.attachment,
      createdAt: data.createdAt,
      noteId: data.noteId,
      organizationId: data.organizationId,
      status: "Em andamento",
      title: data.title,
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

    if (!tasks) {
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

    if (!tasks) {
      return null;
    }

    return tasks;
  }
  async findByStatus(status: string): Promise<ITask[] | null> {
    const tasks = this.items.filter((task) => task.status === status);

    if (!tasks) {
      return null;
    }

    return tasks;
  }
}
