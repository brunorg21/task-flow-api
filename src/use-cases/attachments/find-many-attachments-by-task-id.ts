import { AttachmentRepository } from "@/repositories/attachment-repository";

export class FindManyAttachmentByTaskIdUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(id: string) {
    const attachments = await this.attachmentRepository.findManyByTaskId(id);

    return attachments;
  }
}
