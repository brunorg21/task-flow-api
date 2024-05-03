import { ITask, ITaskCreate } from "@/models/task-model";

export interface TaskRepository {
  create(data: ITaskCreate): Promise<void>;
  save(task: ITask): Promise<void>;
  delete(id: string): Promise<void>;
  findById(taskId: string): Promise<ITask | null>;
  findManyByUser(userId: string): Promise<ITask[] | null>;
  findManyByOrganization(organizationId: string): Promise<ITask[] | null>;
  findByStatus(status: string, tasks: ITask[]): Promise<ITask[] | null>;
  findByDate(date: Date, tasks: ITask[]): Promise<ITask[] | null>;
  assignUserToTask(userId: string, task: ITask): Promise<ITask>;
}
