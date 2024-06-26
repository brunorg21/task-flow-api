import { InMemoryNoteRepository } from "@/repositories/in-memory-repositories/in-memory-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditNoteUseCase } from "./edit";
import { makeNote } from "../factories/make-note";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

let inMemoryNoteRepository: InMemoryNoteRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: EditNoteUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryNoteRepository = new InMemoryNoteRepository();
  sut = new EditNoteUseCase(
    inMemoryNoteRepository,
    inMemoryAttachmentRepository
  );
});

describe("edit note use case", () => {
  it("should be able to edit an note", async () => {
    const note = await makeNote(inMemoryNoteRepository, {
      authorId: "author-1",
      description: "Descrição teste",
      taskId: "task-1",
    });

    await sut.execute({
      noteId: note.id,
      description: "Descrição editada",
      attachments: [],
    });

    expect(inMemoryNoteRepository.items[0].description).toEqual(
      "Descrição editada"
    );
    expect(inMemoryNoteRepository.items[0].updatedAt).toEqual(expect.any(Date));
  });
});
