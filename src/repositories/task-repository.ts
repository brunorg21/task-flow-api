import { ITask, ITaskCreate } from "@/models/task-model";

export interface TaskRepository {
  create(data: ITaskCreate): Promise<ITask>;
  findById(taskId: string): Promise<ITask>;
  findManyByUser(userId: string): Promise<ITask[]>;
  findManyByOrganization(organizationId: string): Promise<ITask[]>;
  findByStatus(status: string): Promise<ITask[]>;
}
