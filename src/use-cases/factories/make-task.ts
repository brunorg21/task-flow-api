import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";

export async function makeTask(taskRepository: InMemoryTaskRepository) {
  await taskRepository.create({
    createdAt: new Date(),
    title: "task-1",
    status: "Em andamento",
    userId: "user-1",
    assignedId: "assigned-1",
    attachments: null,
    organizationId: null,
  });

  const task = taskRepository.items[0];

  return task;
}
