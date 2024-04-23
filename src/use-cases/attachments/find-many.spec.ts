import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindManyAttachmentUseCase } from "./find-many";
import { makeAttachment } from "../factories/make-attachment";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

let sut: FindManyAttachmentUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new FindManyAttachmentUseCase(inMemoryAttachmentRepository);
});

describe("find many attachment use case", () => {
  it("should be able to find many attachment", async () => {
    const attachment = await inMemoryAttachmentRepository.createMany([
      {
        createdAt: new Date(),
        fileName: "teste",
        noteId: null,
        taskId: null,
        url: "teste",
      },
    ]);

    const ids = attachment.map((attachment) => attachment.id);

    const attachmentIds = await sut.execute(ids);

    expect(attachmentIds).toEqual(expect.arrayContaining(attachment));
  });
});
