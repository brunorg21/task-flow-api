import { UploadAttachmentRepository } from "@/repositories/storage/upload-attachment-repository";
import { UploadAttachmentUseCase } from "@/use-cases/storage/upload-attachment";

export function makeUploadAttachment() {
  const uploader = new UploadAttachmentRepository();

  const uploadAttachmentUseCase = new UploadAttachmentUseCase(uploader);
  return uploadAttachmentUseCase;
}
