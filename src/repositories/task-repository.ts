import { ITask, ITaskCreate, ITaskList } from "@/models/task-model";

export interface TaskRepository {
  create(data: ITaskCreate): Promise<void>;
  save(task: ITask): Promise<void>;
  delete(id: string): Promise<void>;
  findById(taskId: string): Promise<ITask | null>;
  findManyByUser(
    userId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ): Promise<ITaskList[]>;
  findManyByOrganization(
    organizationId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ): Promise<ITaskList[]>;
  assignUserToTask(userId: string, task: ITask): Promise<ITask>;
}
