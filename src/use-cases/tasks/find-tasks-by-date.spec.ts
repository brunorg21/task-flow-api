import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindTaskByDate } from "./find-tasks-by-date";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindTaskByDate;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new FindTaskByDate(inMemoryTaskRepository);
});

describe("find task by date use case", () => {
  it("should be able to find tasks by date", async () => {
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
      title: "Task 1",
      userId: "user-id",
    });

    const { tasks } = await sut.execute({
      date: new Date(),
    });

    expect(tasks).toHaveLength(2);
  });

  it("should not be able to find tasks if out range date", async () => {
    await expect(async () => {
      await sut.execute({
        date: new Date(),
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
