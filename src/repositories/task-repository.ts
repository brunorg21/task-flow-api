import { ITask, ITaskCreate } from "@/models/task-model";

export interface TaskRepository {
  create(data: ITaskCreate): Promise<ITask>;
  findById(taskId: string): Promise<ITask | null>;
  findManyByUser(userId: string): Promise<ITask[] | null>;
  findManyByOrganization(organizationId: string): Promise<ITask[] | null>;
  findByStatus(status: string): Promise<ITask[] | null>;
}
