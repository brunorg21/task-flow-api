import { INoteCreate, INote } from "@/models/note-model";
import { NoteRepository } from "../note-repository";
import { randomUUID } from "crypto";
import { IAttachment } from "@/models/attachment-model";
import { AttachmentRepository } from "../attachment-repository";

export class InMemoryNoteRepository implements NoteRepository {
  constructor(private attachmentRepository: AttachmentRepository) {}

  public items: INote[] = [];

  async create(data: INoteCreate): Promise<INote> {
    const note = {
      id: randomUUID(),
      authorId: data.authorId,
      createdAt: new Date(),
      updatedAt: null,
      description: data.description,
      taskId: data.taskId,
    } as INote;

    if (data.attachments) {
      const attachments = await this.attachmentRepository.findMany(
        data.attachments
      );

      const newAttachments = attachments.map((attachment) => {
        return {
          id: attachment.id,
          fileName: attachment.fileName,
          url: attachment.url,
          taskId: attachment.taskId,
          noteId: note.id,
          createdAt: attachment.createdAt,
          type: attachment.type,
        } as IAttachment;
      });

      await this.attachmentRepository.save(newAttachments);
    }

    this.items.push(note);

    return note;
  }

  async findById(id: string): Promise<INote | null> {
    const note = this.items.find((note) => note.id === id);

    if (!note) {
      return null;
    }

    return note;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }

  async save(note: INote): Promise<void> {
    const noteIndex = this.items.findIndex((item) => item.id === note.id);

    this.items[noteIndex] = note;
  }
}
