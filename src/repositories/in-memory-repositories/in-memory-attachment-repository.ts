import { IAttachmentCreate, IAttachment } from "@/models/attachment-model";
import { AttachmentRepository } from "../attachment-repository";
import { randomUUID } from "crypto";

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: IAttachment[] = [];

  async create(data: IAttachmentCreate): Promise<IAttachment> {
    const attachment = {
      id: randomUUID(),
      createdAt: data.createdAt ?? new Date(),
      taskId: data.taskId,
      attachmentId: data.attachmentId,
    } as IAttachment;

    this.items.push(attachment);

    return attachment;
  }

  async save(attachment: IAttachment): Promise<void> {
    const attachmentIndex = this.items.findIndex(
      (item) => item.id === attachment.id
    );

    this.items[attachmentIndex] = attachment;
  }
  async delete(id: string): Promise<void> {
    const attachmentIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(attachmentIndex, 1);
  }
}
