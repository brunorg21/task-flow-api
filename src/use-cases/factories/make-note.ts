import { INoteCreate } from "@/models/note-model";
import { NoteRepository } from "@/repositories/note-repository";

export async function makeNote(
  noteRepository: NoteRepository,
  data?: INoteCreate
) {
  const note = await noteRepository.create({
    taskId: data?.taskId ?? "task-1",
    authorId: data?.authorId ?? "author-1",
    description: data?.description ?? "teste",
  });

  return note;
}
