import { IAttachment } from "./attachment-model";
import { INote } from "./note-model";

export interface ITask {
  id: string;
  title: string;
  createdAt?: Date | null;
  userId: string;
  organizationId: string | null;
  assignedId: string | null;
  status?: "Em andamento" | "Concluída" | "Cancelada";
  attachments?: string[] | null;
}

export interface ITaskList {
  id: string;
  title: string;
  createdAt?: Date | null;
  userId: string;
  organizationId: string | null;
  assignedId: string | null;
  status?: "Em andamento" | "Concluída" | "Cancelada";
  attachments?: IAttachment[];
  notes: INote[];
}

export type ITaskCreate = Omit<ITask, "id">;
