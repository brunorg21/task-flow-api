export interface NoteRepository {
  create(): Promise<void>;
}
