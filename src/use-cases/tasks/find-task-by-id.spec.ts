import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindTaskByIdUseCase } from "./find-task-by-id";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindTaskByIdUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new FindTaskByIdUseCase(
    inMemoryTaskRepository,
    inMemoryAttachmentRepository
  );
});

describe("find task by id use case", () => {
  it("should be able to find task", async () => {
    inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    const task = await sut.execute(inMemoryTaskRepository.items[0].id);

    expect(task.title).toEqual("Task 1");
  });

  it("should not be able to find task with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
