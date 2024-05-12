import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleNoteRepository } from "@/repositories/drizzle-repositories/drizzle-note-repository";
import { FindUniqueUseCase } from "@/use-cases/note/find-unique";

export function makeFindUniqueNoteUseCase() {
  const drizzleNoteRepository = new DrizzleNoteRepository();
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();

  const findUniqueNoteUseCase = new FindUniqueUseCase(
    drizzleNoteRepository,
    drizzleAttachmentRepository
  );

  return findUniqueNoteUseCase;
}
