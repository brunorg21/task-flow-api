export interface IAttachment {
  id: string;
  fileName: string;
  url: string;
  type: string;
  taskId: string | null;
  noteId: string | null;
  createdAt?: Date;
}

export type IAttachmentCreate = Omit<IAttachment, "id">;
