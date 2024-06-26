import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { FindManyTasksByOrganizationUseCase } from "./find-many-tasks-by-organization";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";
import dayjs from "dayjs";

let inMemoryTaskRepository: InMemoryTaskRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: FindManyTasksByOrganizationUseCase;

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository(
    inMemoryAttachmentRepository
  );
  sut = new FindManyTasksByOrganizationUseCase(inMemoryTaskRepository);
});

describe("find many tasks by organization use case", () => {
  it("should be able to find many tasks by organization", async () => {
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      organizationId: "org-id",
      title: "Task 1",
      userId: "user-id",
    });
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: new Date(),
      organizationId: "org-id",
      title: "Task 2",
      userId: "user-id",
    });

    const tasks = await sut.execute("org-id", "Em andamento", null, null);

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({
        organizationId: "org-id",
        status: "Em andamento",
      }),
      expect.objectContaining({
        organizationId: "org-id",
        status: "Em andamento",
      }),
    ]);
  });
  it("should be able to find many tasks by organization and range date", async () => {
    const startDate = dayjs().subtract(1, "day").toDate();

    const endDate = dayjs().add(1, "day").toDate();

    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: endDate,
      organizationId: "org-id",
      title: "Task 1",
      userId: "user-id",
    });
    await inMemoryTaskRepository.create({
      assignedId: "assigned-id",
      attachments: null,
      createdAt: endDate,
      organizationId: "org-id",
      title: "Task 2",
      userId: "user-id",
    });

    const tasks = await sut.execute(
      "org-id",
      "Em andamento",
      startDate,
      endDate
    );

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({
        organizationId: "org-id",
        status: "Em andamento",
        createdAt: endDate,
      }),
      expect.objectContaining({
        organizationId: "org-id",
        status: "Em andamento",
        createdAt: endDate,
      }),
    ]);
  });
});
