import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindManyTasksByUserUseCase } from "./find-many-tasks-by-user";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: FindManyTasksByUserUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new FindManyTasksByUserUseCase(inMemoryTaskRepository);
});

describe("find task by id use case", () => {
  it("should be able to find task", async () => {
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
      title: "Task 2",
      userId: "user-id",
    });

    const tasks = await sut.execute("user-id");

    console.log(tasks);

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({ userId: "user-id" }),
      expect.objectContaining({ userId: "user-id" }),
    ]);
  });

  // it("should not be able to find task with wrong id", async () => {
  //   await expect(async () => {
  //     await sut.execute("wrong-id");
  //   }).rejects.toBeInstanceOf(TaskNotFoundError);
  // });
});
