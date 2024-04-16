import { IAttachmentCreate } from "@/models/attachment-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export async function makeAttachment(
  attachmentRepository: AttachmentRepository,
  data?: IAttachmentCreate
) {
  const attachment = await attachmentRepository.create({
    createdAt: data?.createdAt ?? new Date(),
    attachmentId: data?.attachmentId ?? "1",
    taskId: data?.taskId ?? "task-1",
  });

  return attachment;
}
