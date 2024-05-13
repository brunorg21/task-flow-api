import { IAttachmentCreate } from "@/models/attachment-model";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class CreateAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(data: IAttachmentCreate[]) {
    const attachment = await this.attachmentRepository.createMany(data);

    return attachment;
  }
}
