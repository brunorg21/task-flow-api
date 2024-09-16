import { INote } from "@/models/note-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { NoteRepository } from "@/repositories/note-repository";

export class FindManyNoteByTaskUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(taskId: string) {
    const notes = await this.noteRepository.findManyByTask(taskId);

    return await Promise.all(
      notes.map(async (note) => {
        const attachments = await this.attachmentRepository.findManyByNoteId(
          note.id
        );

        return {
          id: note.id,
          authorId: note.authorId,
          createdAt: note.createdAt,
          description: note.description,
          taskId: note.taskId,
          updatedAt: note.updatedAt,
          attachments,
          user: {
            ...note.user,
            password: undefined,
          },
        };
      })
    );
  }
}
