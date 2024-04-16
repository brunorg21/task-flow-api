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

  async save(attachments: IAttachment[]): Promise<void> {
    const newAttachmentIds = attachments.map(
      (attachment) => attachment.attachmentId
    );

    this.items = this.items.filter((item) =>
      newAttachmentIds.includes(item.attachmentId)
    );

    attachments.forEach((newAttachment) => {
      const existingIndex = this.items.findIndex(
        (item) => item.attachmentId === newAttachment.attachmentId
      );
      if (existingIndex !== -1) {
        this.items[existingIndex] = newAttachment;
      } else {
        this.items.push(newAttachment);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const attachmentIndex = this.items.findIndex(
      (item) => item.attachmentId === id
    );

    this.items.splice(attachmentIndex, 1);
  }
}
