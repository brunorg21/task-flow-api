import { ITaskCreate, ITask, ITaskList } from "@/models/task-model";
import { TaskRepository } from "../task-repository";
import { db } from "@/db/connection";
import { taskSchema } from "@/db/schemas";
import { AttachmentRepository } from "../attachment-repository";
import { IAttachment } from "@/models/attachment-model";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export class DrizzleTaskRepository implements TaskRepository {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async create(data: ITaskCreate): Promise<ITask> {
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
        title: taskSchema.title,
        userId: taskSchema.userId,
        assignedId: taskSchema.assignedId,
        createdAt: taskSchema.createdAt,
        status: taskSchema.status,
        organizationId: taskSchema.organizationId,
      });

    if (data.attachments?.length !== 0 && data.attachments) {
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

    return task[0];
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
        notes: true,
        attachments: true,
      },
    });

    if (!task) {
      return null;
    }

    return {
      ...task,
      attachments: task.attachments.map((attachment) => attachment.id),
    };
  }

  async findManyByUser(
    userId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    startDate: Date | null,
    endDate: Date | null
  ): Promise<ITaskList[]> {
    const tasks = await db.query.taskSchema.findMany({
      where(fields, { eq, and, gte, lte, isNull }) {
        return and(
          eq(fields.userId, userId),
          isNull(fields.organizationId),
          status ? eq(fields.status, status) : undefined,
          startDate && endDate
            ? and(
                gte(fields.createdAt, startDate),
                lte(fields.createdAt, endDate)
              )
            : undefined
        );
      },
      with: {
        notes: true,
        attachments: true,
        assignUser: true,
      },
      orderBy: (task, { desc }) => [desc(task.createdAt)],
    });

    return tasks;
  }

  async findManyByOrganization(
    organizationId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    startDate: Date | null,
    endDate: Date | null
  ): Promise<ITaskList[]> {
    const tasks = await db.query.taskSchema.findMany({
      where(fields, { eq, and, gte, lte }) {
        return and(
          eq(fields.organizationId, organizationId),
          status ? eq(fields.status, status) : undefined,
          startDate && endDate
            ? and(
                gte(fields.createdAt, startDate),
                lte(fields.createdAt, endDate)
              )
            : undefined
        );
      },
      with: {
        notes: true,
        attachments: true,
        assignUser: true,
      },
      orderBy: (task, { desc }) => [desc(task.createdAt)],
    });

    return tasks;
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
