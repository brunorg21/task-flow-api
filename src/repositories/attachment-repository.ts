import { IAttachment, IAttachmentCreate } from "@/models/attachment-model";

export interface AttachmentRepository {
  create(data: IAttachmentCreate): Promise<IAttachment>;
  save(attachments: IAttachment[]): Promise<void>;
  deleteManyByTaskId(id: string): Promise<void>;
}
