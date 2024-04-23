import { IAttachmentCreate } from "@/models/attachment-model";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

export async function makeAttachment(
  attachmentRepository: InMemoryAttachmentRepository,
  data?: IAttachmentCreate
) {
  const attachment = await attachmentRepository.createMany([
    {
      createdAt: data?.createdAt ?? new Date(),
      fileName: data?.fileName ?? "teste",
      url: data?.url ?? "teste",
      taskId: data?.taskId ?? null,
      noteId: data?.noteId ?? null,
    },
  ]);

  return attachment;
}
