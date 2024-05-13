import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { DrizzleNoteRepository } from "@/repositories/drizzle-repositories/drizzle-note-repository";
import { FindManyNoteByTaskUseCase } from "@/use-cases/note/find-many-note-by-task";

export function makeFindManyByTaskUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();
  const drizzleNoteRepository = new DrizzleNoteRepository();

  const findManyByTask = new FindManyNoteByTaskUseCase(
    drizzleNoteRepository,
    drizzleAttachmentRepository
  );

  return findManyByTask;
}
