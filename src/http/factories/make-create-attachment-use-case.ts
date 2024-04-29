import { DrizzleAttachmentRepository } from "@/repositories/drizzle-repositories/drizzle-attachment-repository";
import { CreateAttachmentUseCase } from "@/use-cases/attachments/create";

export function makeCreateAttachmentUseCase() {
  const drizzleAttachmentRepository = new DrizzleAttachmentRepository();

  const createAttachmentUseCase = new CreateAttachmentUseCase(
    drizzleAttachmentRepository
  );

  return createAttachmentUseCase;
}
