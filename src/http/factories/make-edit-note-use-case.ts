import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleNoteRepository } from "@/repositories/drizzle-repositories/drizzle-note-repository";

import { EditNoteUseCase } from "@/use-cases/note/edit";

export function makeEditNoteUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleNoteRepository = new DrizzleNoteRepository();

  const editTaskUseCase = new EditNoteUseCase(
    drizzleNoteRepository,
    drizzleAttachmentRepository
  );

  return editTaskUseCase;
}
