import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTaskUseCase } from "./delete";
import { makeTask } from "../factories/make-task";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { makeAttachment } from "../factories/make-attachment";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: DeleteTaskUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );

  sut = new DeleteTaskUseCase(inMemoryTaskRepository);
});

describe("delete task use case", () => {
  it("should be able to delete an task", async () => {
    const newTask = await makeTask(inMemoryTaskRepository);
    await makeAttachment(inMemoryAttachmentRepository, {
      attachmentId: "1",
      createdAt: new Date(),
      taskId: newTask.id,
    });
    await makeAttachment(inMemoryAttachmentRepository, {
      attachmentId: "2",
      createdAt: new Date(),
      taskId: newTask.id,
    });
    await makeAttachment(inMemoryAttachmentRepository, {
      attachmentId: "3",
      createdAt: new Date(),
      taskId: newTask.id,
    });

    await sut.execute(newTask.id);

    console.log(inMemoryTaskRepository.items);

    expect(inMemoryTaskRepository.items).toHaveLength(0);
    expect(inMemoryAttachmentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an task with wrong id", async () => {
    expect(async () => await sut.execute("task-4")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
