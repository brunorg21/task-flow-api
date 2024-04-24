import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditAttachmentUseCase } from "./edit";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

let sut: EditAttachmentUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new EditAttachmentUseCase(inMemoryAttachmentRepository);
});

describe("edit attachment use case", () => {
  it("should be able to edit an attachment", async () => {
    const attachment = await inMemoryAttachmentRepository.createMany([
      {
        createdAt: new Date(),
        fileName: "teste",
        noteId: null,
        taskId: null,
        url: "teste",
      },
    ]);

    attachment[0].taskId = "1";

    await sut.execute(attachment);

    expect(attachment[0].taskId).toEqual("1");
  });
});
