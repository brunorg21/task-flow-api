import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditTaskUseCase } from "./edit";
import { makeTask } from "../factories/make-task";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { makeAttachment } from "../factories/make-attachment";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: EditTaskUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository();
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new EditTaskUseCase(
    inMemoryTaskRepository,
    inMemoryAttachmentRepository
  );
});

describe("edit task use case", () => {
  it("should be able to edit an task", async () => {
    const task = await makeTask(inMemoryTaskRepository);

    await makeAttachment(inMemoryAttachmentRepository, {
      attachmentId: "1",
      createdAt: new Date(),
      taskId: task.id,
    });
    await makeAttachment(inMemoryAttachmentRepository, {
      attachmentId: "2",
      createdAt: new Date(),
      taskId: task.id,
    });
    await makeAttachment(inMemoryAttachmentRepository, {
      attachmentId: "4",
      createdAt: new Date(),
      taskId: task.id,
    });

    await sut.execute({
      title: "task-1",
      status: "Cancelada",
      taskId: task.id,
      attachments: ["1", "3", "5"],
    });

    expect(inMemoryTaskRepository.items[0].title).toEqual("task-1");
    expect(inMemoryTaskRepository.items[0].status).toEqual("Cancelada");
    expect(inMemoryAttachmentRepository.items).toEqual([
      expect.objectContaining({
        attachmentId: "1",
      }),
      expect.objectContaining({
        attachmentId: "3",
      }),
      expect.objectContaining({
        attachmentId: "5",
      }),
    ]);
  });
});
