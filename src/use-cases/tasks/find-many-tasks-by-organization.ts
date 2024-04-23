import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class FindManyTasksByOrganizationUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(organizationId: string) {
    const tasks = await this.taskRepository.findManyByOrganization(
      organizationId
    );

    if (!tasks) {
      throw new ResourceNotFoundError();
    }

    return tasks;
  }
}
