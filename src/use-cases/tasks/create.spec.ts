import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTaskUseCase } from "./create";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { makeAttachment } from "../factories/make-attachment";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: CreateTaskUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );

  sut = new CreateTaskUseCase(
    inMemoryTaskRepository,
    inMemoryAttachmentRepository
  );
});

describe("create task use case", () => {
  it("should be able to create task", async () => {
    const attachments = await makeAttachment(inMemoryAttachmentRepository, {
      createdAt: new Date(),
      fileName: "teste",
      noteId: null,
      taskId: null,
      url: "teste",
      type: ".jpg",
    });

    await sut.execute({
      assignedId: "assigned-id",
      attachments: [attachments[0].id],
      createdAt: new Date(),
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    expect(inMemoryTaskRepository.items[0].id).toEqual(expect.any(String));
    expect(inMemoryTaskRepository.items[0].attachments).toEqual([
      attachments[0].id,
    ]);
    expect(inMemoryAttachmentRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentRepository.items[0].taskId).toEqual(
      expect.any(String)
    );
  });
});
