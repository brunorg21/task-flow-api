import { InMemoryNoteRepository } from "@/repositories/in-memory-repositories/in-memory-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateNoteUseCase } from "./create";
import { makeTask } from "../factories/make-task";

let inMemoryNoteRepository: InMemoryNoteRepository;
let sut: CreateNoteUseCase;

beforeEach(() => {
  inMemoryNoteRepository = new InMemoryNoteRepository();
  sut = new CreateNoteUseCase(inMemoryNoteRepository);
});

describe("create note use case", () => {
  it("should be able to create note", async () => {
    const note = await sut.execute({
      authorId: "author-1",
      description: "Teste",
      taskId: "task-1",
    });

    expect(note.id).toEqual(expect.any(String));
  });
});
