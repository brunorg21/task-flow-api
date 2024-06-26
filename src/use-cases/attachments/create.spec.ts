import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAttachmentUseCase } from "./create";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

let sut: CreateAttachmentUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new CreateAttachmentUseCase(inMemoryAttachmentRepository);
});

describe("create attachment use case", () => {
  it("should be able to create an attachment", async () => {
    const attachment = await sut.execute([
      {
        fileName: "arquivo 1",
        noteId: null,
        taskId: null,
        url: "teste",
        createdAt: new Date(),
        type: ".jpg",
      },
    ]);

    expect(attachment[0].id).toEqual(expect.any(String));
  });
});
