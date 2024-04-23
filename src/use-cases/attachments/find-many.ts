import { AttachmentRepository } from "@/repositories/attachment-repository";

export class FindManyAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(data: string[]) {
    const attachment = await this.attachmentRepository.findMany(data);

    return attachment;
  }
}
