import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { hash } from "bcrypt";
import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { AssignUserToTask } from "./assign-user-to-task";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: AssignUserToTask;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository();
  sut = new AssignUserToTask(inMemoryTaskRepository);
});

describe("create user use case", () => {
  it("should be able to create a user", async () => {
    const user = await inMemoryUserRepository.create({
      email: "bruno@email.com",
      password: await hash("123456", 6),
      username: "bruno",
    });

    const task = await inMemoryTaskRepository.create({
      assignedId: null,
      attachmentId: null,
      createdAt: new Date(),
      noteId: null,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    const { assignTask } = await sut.execute({
      taskId: task.id,
      userId: user.id,
    });

    expect(assignTask.assignedId).toEqual(expect.any(String));
  });
});
