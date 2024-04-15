import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindTasksByStatus } from "./find-tasks-by-status";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: FindTasksByStatus;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new FindTasksByStatus(inMemoryTaskRepository);
});

describe("find tasks by status use case", () => {
  it("should be able to find tasks by status", async () => {
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

    const tasks = await sut.execute("Em andamento");

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({ status: "Em andamento" }),
      expect.objectContaining({ status: "Em andamento" }),
    ]);
  });

  it("should not be able to find tasks by status with wrong status", async () => {
    await expect(async () => {
      await sut.execute("wrong-status");
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
