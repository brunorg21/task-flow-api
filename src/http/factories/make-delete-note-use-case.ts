import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleNoteRepository } from "@/repositories/drizzle-repositories/drizzle-note-repository";
import { DeleteNoteUseCase } from "@/use-cases/note/delete";

export function makeDeleteNoteUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleTaskRepository = new DrizzleNoteRepository();

  const deleteNoteUseCase = new DeleteNoteUseCase(
    drizzleTaskRepository,
    drizzleAttachmentRepository
  );

  return deleteNoteUseCase;
}
