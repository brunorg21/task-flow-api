export interface IAttachment {
  id: string;
  fileName: string;
  url: string;
  taskId: string | null;
  noteId: string | null;
  createdAt: Date;
}

export type IAttachmentCreate = Omit<IAttachment, "id">;
