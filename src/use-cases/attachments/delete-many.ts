import { AttachmentRepository } from "@/repositories/attachment-repository";

export class DeleteManyAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(data: string[]) {
    const attachment = await this.attachmentRepository.deleteMany(data);

    return attachment;
  }
}
