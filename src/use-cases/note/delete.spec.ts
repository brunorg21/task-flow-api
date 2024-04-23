import { InMemoryNoteRepository } from "@/repositories/in-memory-repositories/in-memory-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteNoteUseCase } from "./delete";
import { makeNote } from "../factories/make-note";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

let inMemoryNoteRepository: InMemoryNoteRepository;

let sut: DeleteNoteUseCase;

beforeEach(() => {
  inMemoryNoteRepository = new InMemoryNoteRepository();
  sut = new DeleteNoteUseCase(inMemoryNoteRepository);
});

describe("delete note use case", () => {
  it("should be able to delete an note", async () => {
    const newNote = await makeNote(inMemoryNoteRepository);

    await sut.execute(newNote.id);

    expect(inMemoryNoteRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an note with wrong id", async () => {
    expect(async () => await sut.execute("note-4")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
