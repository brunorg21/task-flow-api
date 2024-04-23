import { NoteRepository } from "@/repositories/note-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string) {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new ResourceNotFoundError();
    }

    await this.noteRepository.delete(note.id);
  }
}
