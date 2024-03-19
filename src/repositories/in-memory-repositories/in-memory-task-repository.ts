import { ITaskCreate, ITask } from "@/models/task-model";
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
      status: data.status,
      title: data.title,
    } as ITask;

    return task;
  }
  findById(taskId: string): Promise<ITask> {
    throw new Error("Method not implemented.");
  }
  findManyByUser(userId: string): Promise<ITask[]> {
    throw new Error("Method not implemented.");
  }
  findManyByOrganization(organizationId: string): Promise<ITask[]> {
    throw new Error("Method not implemented.");
  }
  findByStatus(status: string): Promise<ITask[]> {
    throw new Error("Method not implemented.");
  }
}
