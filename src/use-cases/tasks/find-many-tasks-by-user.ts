import { TaskRepository } from "@/repositories/task-repository";
import { AttachmentRepository } from "@/repositories/attachment-repository";

export class FindManyTasksByUserUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    userId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ) {
    const tasks = await this.taskRepository.findManyByUser(
      userId,
      status,
      date
    );

    return tasks;
  }
}
