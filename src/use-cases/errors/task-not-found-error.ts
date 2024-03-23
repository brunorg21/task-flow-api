export class TaskNotFoundError extends Error {
  constructor() {
    super("Tarefa(s) não encontrada");
  }
}
