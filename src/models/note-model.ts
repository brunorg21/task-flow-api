import { IAttachment } from "./attachment-model";
import { IUser } from "./user-model";

export interface INote {
  id: string;
  taskId: string;
  authorId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  attachments?: string[] | null | IAttachment[];
  user?: IUser;
}

export type INoteCreate = Omit<INote, "id" | "createdAt" | "updatedAt">;
