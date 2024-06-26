import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { hash } from "bcrypt";
import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { AssignUserToTask } from "./assign-user-to-task";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: AssignUserToTask;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new AssignUserToTask(inMemoryTaskRepository);
});

describe("create user use case", () => {
  it("should be able to create a user", async () => {
    const user = await inMemoryUserRepository.create({
      email: "bruno@email.com",
      password: await hash("123456", 6),
      username: "bruno",
    });

    await inMemoryTaskRepository.create({
      assignedId: null,
      attachments: null,
      createdAt: new Date(),
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });

    const { assignTask } = await sut.execute({
      taskId: inMemoryTaskRepository.items[0].id,
      userId: user.id,
    });

    expect(assignTask.assignedId).toEqual(expect.any(String));
  });
});
