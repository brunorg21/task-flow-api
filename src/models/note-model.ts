import { User } from "@supabase/supabase-js";
import { IAttachment } from "./attachment-model";

export interface INote {
  id: string;
  taskId: string;
  authorId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  attachments?: string[] | null | IAttachment[];
  user?: User;
}

export type INoteCreate = Omit<INote, "id" | "createdAt" | "updatedAt">;
