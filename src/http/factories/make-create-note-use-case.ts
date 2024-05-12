import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleNoteRepository } from "@/repositories/drizzle-repositories/drizzle-note-repository";
import { CreateNoteUseCase } from "@/use-cases/note/create";

export function makeCreateNoteUseCase() {
  const drizzleNoteRepository = new DrizzleNoteRepository();
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();

  const createNoteUseCase = new CreateNoteUseCase(
    drizzleNoteRepository,
    drizzleAttachmentRepository
  );

  return createNoteUseCase;
}
