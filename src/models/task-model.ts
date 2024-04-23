export interface ITask {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  organizationId: string | null;
  assignedId: string | null;
  status?: "Em andamento" | "Concluída" | "Cancelada";
  attachments: string[] | null;
}

export type ITaskCreate = Omit<ITask, "id">;
