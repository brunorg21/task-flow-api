import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface EditTaskUseCaseRequest {
  taskId: string;
  title: string;
  status: "Em andamento" | "Concluída" | "Cancelada";
}

export class EditTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ title, taskId, status }: EditTaskUseCaseRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    task.title = title;
    task.status = status;

    await this.taskRepository.save(task);
  }
}
