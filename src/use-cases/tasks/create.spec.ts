import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTaskUseCase } from "./create";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: CreateTaskUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new CreateTaskUseCase(inMemoryTaskRepository);
});

describe("create task use case", () => {
  it("should be able to create task", async () => {
    const task = await sut.execute({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    expect(task.id).toEqual(expect.any(String));
  });
});
