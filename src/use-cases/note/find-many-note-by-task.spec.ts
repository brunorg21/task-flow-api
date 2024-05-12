import { beforeEach, describe, expect, it } from "vitest";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryNoteRepository } from "@/repositories/in-memory-repositories/in-memory-note-repository";
import { FindManyNoteByTaskUseCase } from "./find-many-note-by-task";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryNoteRepository: InMemoryNoteRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindManyNoteByTaskUseCase;

beforeEach(() => {
  inMemoryNoteRepository = new InMemoryNoteRepository();
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new FindManyNoteByTaskUseCase(
    inMemoryNoteRepository,
    inMemoryAttachmentRepository
  );
});

describe("find many note by task use case", () => {
  it("should be able to find many notes", async () => {
    await inMemoryNoteRepository.create({
      authorId: "user-01",
      description: "teste",
      taskId: "task-01",
      attachments: ["1", "2"],
    });
    await inMemoryNoteRepository.create({
      authorId: "user-01",
      description: "testes",
      taskId: "task-01",
      attachments: ["1", "2"],
    });

    const notes = await sut.execute("task-01");

    expect(notes).toHaveLength(2);
    expect(notes[0].authorId).toEqual("user-01");
  });
});
