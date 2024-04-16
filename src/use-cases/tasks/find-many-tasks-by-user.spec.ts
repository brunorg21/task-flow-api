import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindManyTasksByUserUseCase } from "./find-many-tasks-by-user";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindManyTasksByUserUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new FindManyTasksByUserUseCase(inMemoryTaskRepository);
});

describe("find many tasks by user use case", () => {
  it("should be able to find many tasks by user", async () => {
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 2",
      userId: "user-id",
    });

    const tasks = await sut.execute("user-id");

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({ userId: "user-id" }),
      expect.objectContaining({ userId: "user-id" }),
    ]);
  });

  it("should not be able to find many task by user with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
