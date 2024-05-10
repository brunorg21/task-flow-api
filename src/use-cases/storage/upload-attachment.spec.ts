import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUploader } from "@/repositories/in-memory-repositories/in-memory-uploader";
import { UploadAttachmentUseCase } from "./upload-attachment";
import { InvalidAttachmentTypeError } from "../@errors/invalid-attachment-type-error";

let inMemoryUploader: InMemoryUploader;
let sut: UploadAttachmentUseCase;

beforeEach(() => {
  inMemoryUploader = new InMemoryUploader();
  sut = new UploadAttachmentUseCase(inMemoryUploader);
});

describe("upload attachment use case", () => {
  it("should be able to upload attachment", async () => {
    const { data } = await sut.execute({
      buffer: Buffer.from(""),
      fileName: "example.jpg",
      fileType: "image/jpg",
    });

    expect(data.path).toEqual(expect.any(String));
  });

  it("should be able to upload attachment with invalid type", async () => {
    expect(async () => {
      await sut.execute({
        buffer: Buffer.from(""),
        fileName: "example.png",
        fileType: "audio/mpeg",
      });
    }).rejects.toBeInstanceOf(InvalidAttachmentTypeError);
  });
});
