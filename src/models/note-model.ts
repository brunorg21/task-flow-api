export interface INote {
  id: string;
  taskId: string;
  authorId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  attachments?: string[] | null;
}

export type INoteCreate = Omit<INote, "id" | "createdAt" | "updatedAt">;
