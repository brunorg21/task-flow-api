import { TaskRepository } from "@/repositories/task-repository";

export class FindManyTasksByOrganizationUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    organizationId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ) {
    const tasks = await this.taskRepository.findManyByOrganization(
      organizationId,
      status,
      date
    );

    return tasks;
  }
}
