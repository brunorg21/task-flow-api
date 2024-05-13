import { NoteRepository } from "@/repositories/note-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class DeleteNoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(id: string) {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new ResourceNotFoundError();
    }

    const attachments = await this.attachmentRepository.findManyByNoteId(
      note.id
    );

    if (attachments) {
      await this.attachmentRepository.deleteMany(
        attachments.map((attachment) => attachment.id)
      );
    }

    await this.noteRepository.delete(note.id);
  }
}
