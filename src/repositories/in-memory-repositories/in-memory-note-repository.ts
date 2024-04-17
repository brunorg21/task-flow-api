import { INoteCreate, INote } from "@/models/note-model";
import { NoteRepository } from "../note-repository";
import { randomUUID } from "crypto";

export class InMemoryNoteRepository implements NoteRepository {
  public items: INote[] = [];

  async create(data: INoteCreate): Promise<INote> {
    const org = {
      id: randomUUID(),
      authorId: data.authorId,
      createdAt: new Date(),
      updatedAt: null,
      description: data.description,
      taskId: data.taskId,
    } as INote;

    this.items.push(org);

    return org;
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
