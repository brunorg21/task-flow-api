import { IAttachmentCreate, IAttachment } from "@/models/attachment-model";
import { AttachmentRepository } from "../attachment-repository";
import { db } from "@/db/connection";
import { attachmentSchema } from "@/db/schemas";
import { eq, inArray } from "drizzle-orm";

export class DrizzleAttachmentRepository implements AttachmentRepository {
  async createMany(data: IAttachmentCreate[]): Promise<IAttachment[]> {
    const attachments = await db
      .insert(attachmentSchema)
      .values(data)
      .returning({
        id: attachmentSchema.id,
        fileName: attachmentSchema.fileName,
        noteId: attachmentSchema.noteId,
        taskId: attachmentSchema.taskId,
        url: attachmentSchema.url,
        type: attachmentSchema.type,
        createdAt: attachmentSchema.createdAt,
      });

    return attachments;
  }
  async save(attachments: IAttachment[]): Promise<void> {
    await Promise.all(
      attachments.map(async (attachment) => {
        const existingAttachment = await db
          .select()
          .from(attachmentSchema)
          .where(eq(attachmentSchema.id, attachment.id));

        if (existingAttachment) {
          await db
            .update(attachmentSchema)
            .set(attachment)
            .where(eq(attachmentSchema.id, attachment.id));
        } else {
          await db.insert(attachmentSchema).values(attachment);
        }
      })
    );
  }

  async findMany(attachmentIds: string[]): Promise<IAttachment[]> {
    const attachments = db
      .select()
      .from(attachmentSchema)
      .where(inArray(attachmentSchema.id, attachmentIds));

    return attachments;
  }

  async deleteMany(attachmentIds: string[]): Promise<void> {
    await db
      .delete(attachmentSchema)
      .where(inArray(attachmentSchema.id, attachmentIds));
  }
}
