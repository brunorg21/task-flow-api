import { TaskRepository } from "@/repositories/task-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { AttachmentRepository } from "@/repositories/attachment-repository";
import { supabaseClient } from "@/db/supabase/client";

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }
    const attachments = await this.attachmentRepository.findManyByTaskId(
      task.id
    );

    if (attachments) {
      await Promise.all(
        attachments.map(
          async (attachment) =>
            await supabaseClient.storage
              .from("attachments")
              .remove([attachment.fileName])
        )
      );

      await this.attachmentRepository.deleteMany(
        attachments.map((attachment) => attachment.id)
      );
    }

    await this.taskRepository.delete(task.id);
  }
}
