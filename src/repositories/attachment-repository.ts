import { IAttachment, IAttachmentCreate } from "@/models/attachment-model";

export interface AttachmentRepository {
  create(data: IAttachmentCreate): Promise<IAttachment>;
  save(attachment: IAttachment): Promise<void>;
  delete(id: string): Promise<void>;
}
