export interface INote {
  id: string;
  taskId: string;
  authorId: string;
  description: string;
  createdAt: Date;
}

export type INoteCreate = Omit<INote, "id" | "createdAt">;
