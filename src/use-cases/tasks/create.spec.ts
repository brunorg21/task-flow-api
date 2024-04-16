import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTaskUseCase } from "./create";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

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
    const task = await sut.execute({
      assignedId: "assigned-id",
      attachments: ["1", "2"],
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    expect(task.id).toEqual(expect.any(String));
    expect(inMemoryAttachmentRepository.items).toHaveLength(2);
  });
});
