import { IAttachmentCreate, IAttachment } from "@/models/attachment-model";
import { AttachmentRepository } from "../attachment-repository";
import { randomUUID } from "crypto";

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: IAttachment[] = [];

  async createMany(data: IAttachmentCreate[]): Promise<IAttachment[]> {
    const attachments = data.map((attachment) => {
      return {
        id: randomUUID(),
        createdAt: attachment.createdAt ?? new Date(),
        taskId: attachment.taskId,
        fileName: attachment.fileName,
        noteId: attachment.noteId,
        url: attachment.url,
        type: attachment.type,
      };
    });

    attachments.map((attachment) => this.items.push(attachment));

    return attachments;
  }

  async save(attachments: IAttachment[]): Promise<void> {
    const newAttachmentIds = attachments.map((attachment) => attachment.id);

    this.items = this.items.filter((item) =>
      newAttachmentIds.includes(item.id)
    );

    attachments.forEach((newAttachment) => {
      const existingIndex = this.items.findIndex(
        (item) => item.id === newAttachment.id
      );
      if (existingIndex !== -1) {
        this.items[existingIndex] = newAttachment;
      } else {
        this.items.push(newAttachment);
      }
    });
  }

  async findMany(attachmentIds: string[]): Promise<IAttachment[]> {
    const attachments = this.items.filter((attachment) =>
      attachmentIds.includes(attachment.id)
    );

    return attachments;
  }

  async deleteMany(attachmentIds: string[]): Promise<void> {
    this.items = this.items.filter(
      (attachment) => !attachmentIds.includes(attachment.id)
    );
  }

  async findManyByTaskId(taskId: string): Promise<IAttachment[]> {
    const attachments = this.items.filter(
      (attachment) => attachment.taskId === taskId
    );

    return attachments;
  }

  async findManyByNoteId(noteId: string): Promise<IAttachment[]> {
    const attachments = this.items.filter(
      (attachment) => attachment.noteId === noteId
    );

    return attachments;
  }
}
