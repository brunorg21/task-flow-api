import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTaskUseCase } from "./delete";
import { makeTask } from "../factories/make-task";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let inMemoryTaskRepository: InMemoryTaskRepository;

let sut: DeleteTaskUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new DeleteTaskUseCase(inMemoryTaskRepository);
});

describe("delete task use case", () => {
  it("should be able to delete an task", async () => {
    const newTask = await makeTask(inMemoryTaskRepository);

    await sut.execute(newTask.id);

    expect(inMemoryTaskRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an task with wrong id", async () => {
    expect(async () => await sut.execute("task-4")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
