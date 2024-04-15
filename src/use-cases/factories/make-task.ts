import { TaskRepository } from "@/repositories/task-repository";

export async function makeTask(taskRepository: TaskRepository) {
  const task = await taskRepository.create({
    createdAt: new Date(),
    title: "task-1",
    status: "Em andamento",
    userId: "user-1",
    assignedId: "assigned-1",
    attachment: null,
    noteId: "1",
    organizationId: null,
  });

  return task;
}
