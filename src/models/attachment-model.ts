export interface IAttachment {
  id: string;
  attachmentId: string;
  taskId: string;
  createdAt: Date;
}

export type IAttachmentCreate = Omit<IAttachment, "id">;
