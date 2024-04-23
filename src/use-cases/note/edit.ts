import { NoteRepository } from "@/repositories/note-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface EditNoteUseCaseRequest {
  noteId: string;
  description: string;
}

export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, description }: EditNoteUseCaseRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new ResourceNotFoundError();
    }

    note.description = description;
    note.updatedAt = new Date();

    await this.noteRepository.save(note);
  }
}
