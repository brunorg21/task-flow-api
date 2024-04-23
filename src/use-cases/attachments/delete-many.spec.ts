import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteManyAttachmentUseCase } from "./delete-many";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

let sut: DeleteManyAttachmentUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new DeleteManyAttachmentUseCase(inMemoryAttachmentRepository);
});

describe("deletemany attachment use case", () => {
  it("should be able to delete many an attachment", async () => {
    const attachment = await inMemoryAttachmentRepository.createMany([
      {
        createdAt: new Date(),
        fileName: "teste",
        url: "teste",
        taskId: null,
        noteId: null,
      },
    ]);

    const ids = attachment.map((attachment) => attachment.id);

    await sut.execute(ids);

    expect(inMemoryAttachmentRepository.items).toHaveLength(0);
  });
});
