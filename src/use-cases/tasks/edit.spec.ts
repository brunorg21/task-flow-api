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
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new EditTaskUseCase(
    inMemoryTaskRepository,
    inMemoryAttachmentRepository
  );
});

describe("edit task use case", () => {
  it("should be able to edit an task", async () => {
    const task = await makeTask(inMemoryTaskRepository);

    await makeAttachment(inMemoryAttachmentRepository, {
      createdAt: new Date(),
      taskId: task.id,
      fileName: "teste1",
      url: "teste1",
      noteId: null,
      type: ".jpg",
    });
    await makeAttachment(inMemoryAttachmentRepository, {
      createdAt: new Date(),
      taskId: task.id,
      fileName: "teste2",
      url: "teste2",
      noteId: null,
      type: ".jpg",
    });
    await makeAttachment(inMemoryAttachmentRepository, {
      createdAt: new Date(),
      taskId: task.id,
      fileName: "teste2",
      url: "teste2",
      noteId: null,
      type: ".jpg",
    });

    await sut.execute({
      title: "task-1",
      status: "Cancelada",
      taskId: task.id,
      attachments: ["1", "3", "5"],
    });

    expect(inMemoryTaskRepository.items[0].title).toEqual("task-1");
    expect(inMemoryTaskRepository.items[0].status).toEqual("Cancelada");
    expect(inMemoryTaskRepository.items[0].attachments).toEqual([
      "1",
      "3",
      "5",
    ]);
    expect(inMemoryAttachmentRepository.items).toEqual([
      expect.objectContaining({
        id: "1",
      }),
      expect.objectContaining({
        id: "3",
      }),
      expect.objectContaining({
        id: "5",
      }),
    ]);
  });
});
