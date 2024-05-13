import { AttachmentRepository } from "@/repositories/attachment-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { NoteRepository } from "@/repositories/note-repository";

export class FindUniqueUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(noteId: string) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new ResourceNotFoundError();
    }

    const attachments = await this.attachmentRepository?.findManyByNoteId(
      noteId
    );

    return {
      id: note.id,
      description: note.description,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      authorId: note.authorId,
      attachments,
    };
  }
}
