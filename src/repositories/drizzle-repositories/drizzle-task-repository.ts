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

  async findManyByUser(
    userId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ): Promise<ITaskList[]> {
    const startDate = dayjs(date)
      .add(dayjs(date).utcOffset(), "minutes")
      .startOf("day")
      .toDate();
    const endDate = dayjs(date)
      .add(dayjs(date).utcOffset(), "minutes")
      .endOf("day")
      .toDate();

    const tasks = await db.query.taskSchema.findMany({
      where(fields, { eq, and, gte, lte }) {
        return and(
          eq(fields.userId, userId),
          status ? eq(fields.status, status) : undefined,
          date
            ? and(
                gte(fields.createdAt, startDate),
                lte(fields.createdAt, endDate)
              )
            : undefined
        );
      },
      with: {
        note: true,
      },
      orderBy: (task, { desc }) => [desc(task.createdAt)],
    });

    return await Promise.all(
      tasks.map(async (task) => {
        const attachments = await this.attachmentRepository.findManyByTaskId(
          task.id
        );

        return {
          id: task.id,
          assignedId: task.assignedId,
          organizationId: task.organizationId,
          title: task.title,
          userId: task.userId,
          attachments,
          createdAt: task.createdAt,
          status: task.status,
          note: task.note,
        } as ITaskList;
      })
    );
  }

  async findManyByOrganization(
    organizationId: string,
    status: "Em andamento" | "Concluída" | "Cancelada" | null,
    date: Date | null
  ): Promise<ITaskList[]> {
    const startDate = dayjs(date)
      .add(dayjs(date).utcOffset(), "minutes")
      .startOf("day")
      .toDate();
    const endDate = dayjs(date)
      .add(dayjs(date).utcOffset(), "minutes")
      .endOf("day")
      .toDate();
    const tasks = await db.query.taskSchema.findMany({
      where(fields, { eq, and, gte, lte }) {
        return and(
          eq(fields.organizationId, organizationId),
          status ? eq(fields.status, status) : undefined,
          date
            ? and(
                gte(fields.createdAt, startDate),
                lte(fields.createdAt, endDate)
              )
            : undefined
        );
      },
      with: {
        note: true,
      },
      orderBy: (task, { desc }) => [desc(task.createdAt)],
    });

    return await Promise.all(
      tasks.map(async (task) => {
        const attachments = await this.attachmentRepository.findManyByTaskId(
          task.id
        );

        return {
          id: task.id,
          assignedId: task.assignedId,
          organizationId: task.organizationId,
          title: task.title,
          userId: task.userId,
          attachments,
          createdAt: task.createdAt,
          status: task.status,
          note: task.note,
        } as ITaskList;
      })
    );
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
