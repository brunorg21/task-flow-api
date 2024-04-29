import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { CreateAttachmentUseCase } from "@/use-cases/attachments/create";
import { DeleteManyAttachmentUseCase } from "@/use-cases/attachments/delete-many";

export function makeDeleteAttachmentUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();

  const deleteManyAttachmentsUseCase = new DeleteManyAttachmentUseCase(
    drizzleAttachmentRepository
  );

  return deleteManyAttachmentsUseCase;
}
