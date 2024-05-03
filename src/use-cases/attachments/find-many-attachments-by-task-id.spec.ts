import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindManyAttachmentByTaskIdUseCase } from "./find-many-attachments-by-task-id";

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

let sut: FindManyAttachmentByTaskIdUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new FindManyAttachmentByTaskIdUseCase(inMemoryAttachmentRepository);
});

describe("find many attachment use case", () => {
  it("should be able to find many attachments by task id", async () => {
    const attachment = await inMemoryAttachmentRepository.createMany([
      {
        createdAt: new Date(),
        fileName: "teste",
        noteId: null,
        taskId: "task-1",
        url: "teste",
        type: ".jpg",
      },
      {
        createdAt: new Date(),
        fileName: "teste",
        noteId: null,
        taskId: "task-1",
        url: "teste",
        type: ".jpg",
      },
    ]);

    const attachments = await sut.execute("task-1");

    expect(attachments[0].taskId).toEqual("task-1");
  });
});
