import { INoteCreate, INote } from "@/models/note-model";
import { NoteRepository } from "../note-repository";
import { noteSchema } from "@/db/schemas";
import { db } from "@/db/connection";
import { eq } from "drizzle-orm";

export class DrizzleNoteRepository implements NoteRepository {
  async create(data: INoteCreate): Promise<INote> {
    const note = await db.insert(noteSchema).values(data).returning({
      id: noteSchema.id,
      taskId: noteSchema.taskId,
      authorId: noteSchema.authorId,
      description: noteSchema.description,
      createdAt: noteSchema.createdAt,
      updatedAt: noteSchema.updatedAt,
    });

    return note[0];
  }

  async save(note: INote): Promise<void> {
    await db.update(noteSchema).set(note).where(eq(noteSchema.id, note.id));
  }

  async delete(noteId: string): Promise<void> {
    await db.delete(noteSchema).where(eq(noteSchema.id, noteId));
  }

  async findById(noteId: string): Promise<INote | null> {
    const note = await db.query.noteSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, noteId);
      },
      with: {
        attachment: true,
      },
    });

    if (!note) {
      return null;
    }

    return note;
  }

  async findManyByTask(taskId: string): Promise<INote[]> {
    const notes = await db.query.noteSchema.findMany({
      where(fields, { eq }) {
        return eq(fields.taskId, taskId);
      },
      with: {
        attachment: true,
      },
    });

    return notes;
  }
}
