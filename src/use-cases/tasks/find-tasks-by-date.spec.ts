import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { TaskNotFoundError } from "../errors/task-not-found-error";
import { FindTaskByDate } from "./find-tasks-by-date";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: FindTaskByDate;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new FindTaskByDate(inMemoryTaskRepository);
});

describe("find task by date use case", () => {
  it("should be able to find tasks by date", async () => {
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachment: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachment: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    const { tasks } = await sut.execute({
      date: new Date(),
    });

    console.log(tasks);
    console.log(new Date(2025, 10, 21));

    expect(tasks).toHaveLength(2);
  });

  it("should not be able to find tasks if out range date", async () => {
    await expect(async () => {
      await sut.execute({
        date: new Date(),
      });
    }).rejects.toBeInstanceOf(TaskNotFoundError);
  });
});
