import { ITaskCreate, ITask } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { db } from "@/db/connection";
import { taskSchema } from "@/db/schemas";
import { AttachmentRepository } from "../attachment-repository";
import { IAttachment } from "@/models/attachment-model";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export class DrizzleTaskRepository implements TaskRepository {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async create(data: ITaskCreate): Promise<void> {
    const task = await db
      .insert(taskSchema)
      .values({
        title: data.title,
        userId: data.userId,
        assignedId: data.assignedId,
        createdAt: new Date(),
        status: data.status,
        organizationId: data.organizationId,
      })
      .returning({
        id: taskSchema.id,
      });

    if (data.attachments) {
      const attachments = await this.attachmentRepository.findMany(
        data.attachments
      );

      const newAttachments = attachments.map((attachment) => {
        return {
          id: attachment.id,
          fileName: attachment.fileName,
          url: attachment.url,
          taskId: task[0].id,
          noteId: attachment.noteId,
          createdAt: attachment.createdAt,
          type: attachment.type,
        } as IAttachment;
      });

      await this.attachmentRepository.save(newAttachments);
    }
  }

  async save(task: ITask): Promise<void> {
    await db.update(taskSchema).set(task).where(eq(taskSchema.id, task.id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(taskSchema).where(eq(taskSchema.id, id));
  }

  async findById(taskId: string): Promise<ITask | null> {
    const task = await db.query.taskSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, taskId);
      },
      with: {
        note: true,
      },
    });

    if (!task) {
      return null;
    }

    return task;
  }

  async findManyByUser(userId: string): Promise<ITask[] | null> {
    const tasks = await db.query.taskSchema.findMany({
      where(fields, { eq }) {
        return eq(fields.userId, userId);
      },
      orderBy: (task, { desc }) => [desc(task.createdAt)],
    });

    if (!tasks) {
      return null;
    }

    return tasks;
  }

  async findManyByOrganization(
    organizationId: string
  ): Promise<ITask[] | null> {
    const tasks = await db.query.taskSchema.findMany({
      where(fields, { eq }) {
        return eq(fields.organizationId, organizationId);
      },
    });

    if (!tasks) {
      return null;
    }

    return tasks;
  }

  async findByStatus(status: string, tasks: ITask[]): Promise<ITask[] | null> {
    const filteredTasks = tasks.filter((task) => task.status?.includes(status));

    if (!filteredTasks) {
      return null;
    }

    return filteredTasks;
  }
  async findByDate(date: Date, tasks: ITask[]): Promise<ITask[] | null> {
    const filteredTasks = tasks.filter(
      (task) =>
        dayjs(task.createdAt).isBefore(date) ||
        dayjs(task.createdAt).isSame(date)
    );

    if (!filteredTasks) {
      return null;
    }

    return filteredTasks;
  }
  async assignUserToTask(userId: string, task: ITask): Promise<ITask> {
    await db
      .update(taskSchema)
      .set({
        assignedId: userId,
      })
      .where(eq(taskSchema.id, task.id));

    return task;
  }
}
