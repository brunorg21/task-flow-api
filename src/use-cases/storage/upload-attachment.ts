import { InvalidCredentialsError } from "../@errors/invalid-credentials";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { Uploader } from "@/repositories/uploader";
import { InvalidAttachmentTypeError } from "../@errors/invalid-attachment-type-error";
import { IAttachmentCreate } from "@/models/attachment-model";
import { UploadError } from "../@errors/upload-error";

export interface UploadAttachmentRequest {
  fileName: string;
  fileType: string;
  buffer: Buffer;
}

export class UploadAttachmentUseCase {
  constructor(private uploader: Uploader) {}

  async execute({ buffer, fileName, fileType }: UploadAttachmentRequest) {
    const regex = /^image\/(jpeg|png)$|^application\/pdf$|^image\/(jpeg|jpg)$/;

    if (!regex.test(fileType)) {
      throw new InvalidAttachmentTypeError(fileType);
    }

    const data = await this.uploader.upload({
      buffer,
      fileName,
    });

    if (!data) {
      throw new UploadError();
    }

    return {
      data,
    };
  }
}
