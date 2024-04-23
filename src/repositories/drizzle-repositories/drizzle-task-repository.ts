import { ITaskCreate, ITask } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { db } from "@/db/connection";
import { taskSchema } from "@/db/schemas";

export class DrizzleTaskRepository implements TaskRepository {
  async create(data: ITaskCreate): Promise<void> {
    await db.insert(taskSchema).values({
      title: data.title,
      userId: data.userId,
      assignedId: data.assignedId,
      createdAt: new Date(),
      status: data.status,
      organizationId: data.organizationId,
    });
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
