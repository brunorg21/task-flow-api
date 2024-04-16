import { INoteCreate } from "@/models/note-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { NoteRepository } from "@/repositories/note-repository";

export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(data: INoteCreate) {
    const note = await this.noteRepository.create(data);

    return note;
  }
}
