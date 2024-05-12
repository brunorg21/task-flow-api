import { INote, INoteCreate } from "@/models/note-model";

export interface NoteRepository {
  create(data: INoteCreate): Promise<INote>;
  save(note: INote): Promise<void>;
  delete(noteId: string): Promise<void>;
  findById(noteId: string): Promise<INote | null>;
  findManyByTask(taskId: string): Promise<INote[]>;
}
