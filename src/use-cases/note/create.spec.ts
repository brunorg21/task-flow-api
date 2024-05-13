import { InMemoryNoteRepository } from "@/repositories/in-memory-repositories/in-memory-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateNoteUseCase } from "./create";
import { makeTask } from "../factories/make-task";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryNoteRepository: InMemoryNoteRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: CreateNoteUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryNoteRepository = new InMemoryNoteRepository();
  sut = new CreateNoteUseCase(
    inMemoryNoteRepository,
    inMemoryAttachmentRepository
  );
});

describe("create note use case", () => {
  it("should be able to create note", async () => {
    const note = await sut.execute({
      authorId: "author-1",
      description: "Teste",
      taskId: "task-1",
      attachments: ["1", "2"],
    });

    expect(note.id).toEqual(expect.any(String));
  });
});
