import { AttachmentRepository } from "@/repositories/attachment-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class DeleteManyAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(data: string[]) {
    const attachment = await this.attachmentRepository.deleteMany(data);

    return attachment;
  }
}
