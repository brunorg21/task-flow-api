import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditTaskUseCase } from "./edit";
import { makeTask } from "../factories/make-task";

let inMemoryTaskRepository: InMemoryTaskRepository;

let sut: EditTaskUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new EditTaskUseCase(inMemoryTaskRepository);
});

describe("edit task use case", () => {
  it("should be able to edit an task", async () => {
    const task = await makeTask(inMemoryTaskRepository);

    await sut.execute({
      title: "task-1",
      status: "Cancelada",
      taskId: task.id,
    });

    expect(inMemoryTaskRepository.items[0].title).toEqual("task-1");
    expect(inMemoryTaskRepository.items[0].status).toEqual("Cancelada");
  });
});
