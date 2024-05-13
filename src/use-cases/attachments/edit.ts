import { IAttachment } from "@/models/attachment-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class EditAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(data: IAttachment[]) {
    const attachment = await this.attachmentRepository.save(data);

    return attachment;
  }
}
