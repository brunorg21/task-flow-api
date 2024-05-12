import { NoteRepository } from "@/repositories/note-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { IAttachment } from "@/models/attachment-model";

interface EditNoteUseCaseRequest {
  noteId: string;
  description: string;
  attachments: string[];
}

export class EditNoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute({ noteId, description, attachments }: EditNoteUseCaseRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new ResourceNotFoundError();
    }

    const currentAttachments = await this.attachmentRepository.findManyByNoteId(
      noteId
    );

    const attachmentsToAdd = attachments.filter((newAttachmentId) => {
      return !currentAttachments.some(
        (attachment) => attachment.id === newAttachmentId
      );
    });

    const attachmentsToRemove = currentAttachments.filter((attachment) => {
      return !attachments.includes(attachment.id);
    });

    if (attachmentsToAdd.length > 0) {
      const currentAttachments = await this.attachmentRepository.findMany(
        attachmentsToAdd
      );
      const newAttachments = currentAttachments.map((attachment) => {
        return {
          id: attachment.id,
          fileName: attachment.fileName,
          noteId: note.id,
          taskId: attachment.taskId,
          type: attachment.type,
          url: attachment.url,
          createdAt: attachment.createdAt,
        } as IAttachment;
      });
      await this.attachmentRepository.save(newAttachments);
    }

    if (attachmentsToRemove.length > 0) {
      await this.attachmentRepository.deleteMany(
        attachmentsToRemove.map((a) => a.id)
      );
    }

    note.description = description;
    note.updatedAt = new Date();
    note.attachments = attachments;

    await this.noteRepository.save(note);
  }
}
