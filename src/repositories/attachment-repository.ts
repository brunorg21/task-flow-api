import { IAttachment, IAttachmentCreate } from "@/models/attachment-model";

export interface AttachmentRepository {
  createMany(data: IAttachmentCreate[]): Promise<IAttachment[]>;
  save(attachments: IAttachment[]): Promise<void>;
  findMany(attachmentIds: string[]): Promise<IAttachment[]>;
  deleteMany(attachmentIds: string[]): Promise<void>;
  findManyByTaskId(taskId: string): Promise<IAttachment[]>;
  findManyByNoteId(noteId: string): Promise<IAttachment[]>;
}
