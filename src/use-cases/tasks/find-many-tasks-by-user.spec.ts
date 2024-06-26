import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { FindManyTasksByUserUseCase } from "./find-many-tasks-by-user";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import dayjs from "dayjs";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindManyTasksByUserUseCase;

beforeEach(() => {
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new FindManyTasksByUserUseCase(inMemoryTaskRepository);
});

describe("find many tasks by user use case", () => {
  it("should be able to find many tasks by user", async () => {
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      organizationId: null,
      title: "Task 2",
      userId: "user-id",
    });

    const tasks = await sut.execute("user-id", "Em andamento", null, null);

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({
        userId: "user-id",
        status: "Em andamento",
      }),
      expect.objectContaining({
        userId: "user-id",
        status: "Em andamento",
      }),
    ]);
  });
  it("should be able to find many tasks by range date", async () => {
    const startDate = dayjs().subtract(1, "day").toDate();

    const endDate = dayjs().add(1, "day").toDate();

    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: endDate,
      organizationId: null,
      title: "Task 1",
      userId: "user-id",
    });
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: endDate,
      organizationId: null,
      title: "Task 2",
      userId: "user-id",
    });

    const tasks = await sut.execute(
      "user-id",
      "Em andamento",
      startDate,
      endDate
    );

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({
        userId: "user-id",
        status: "Em andamento",
        createdAt: endDate,
      }),
      expect.objectContaining({
        userId: "user-id",
        status: "Em andamento",
        createdAt: endDate,
      }),
    ]);
  });
});
