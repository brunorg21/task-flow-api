import { beforeEach, describe, expect, it } from "vitest";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import { FindUniqueUseCase } from "./find-unique";
import { InMemoryNoteRepository } from "@/repositories/in-memory-repositories/in-memory-note-repository";

let inMemoryNoteRepository: InMemoryNoteRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindUniqueUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryNoteRepository = new InMemoryNoteRepository();
  sut = new FindUniqueUseCase(
    inMemoryNoteRepository,
    inMemoryAttachmentRepository
  );
});

describe("find task by id use case", () => {
  it("should be able to find task", async () => {
    const createdNote = await inMemoryNoteRepository.create({
      authorId: "user-01",
      description: "teste",
      taskId: "task-01",
      attachments: ["1", "2"],
    });

    const note = await sut.execute(createdNote.id);

    expect(note.id).toEqual(expect.any(String));
  });

  it("should not be able to find task with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
