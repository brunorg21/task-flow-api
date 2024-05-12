import { IAttachment } from "@/models/attachment-model";
import { INoteCreate } from "@/models/note-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { NoteRepository } from "@/repositories/note-repository";

export class CreateNoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(data: INoteCreate) {
    const note = await this.noteRepository.create(data);

    if (data.attachments) {
      const attachments = await this.attachmentRepository.findMany(
        data.attachments as string[]
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

    return note;
  }
}
