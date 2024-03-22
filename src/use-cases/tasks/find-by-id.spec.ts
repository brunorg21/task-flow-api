import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindByIdUseCase } from "./find-by-id";
import { TaskNotFoundError } from "../errors/task-not-found.-error";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: FindByIdUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new FindByIdUseCase(inMemoryTaskRepository);
});

describe("find task by id use case", () => {
  it("should be able to find task", async () => {
    const taskCreated = await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachment: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    const task = await sut.execute(taskCreated.id);

    expect(task.title).toEqual("Task 1");
  });

  it("should not be able to find task with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(TaskNotFoundError);
  });
});
