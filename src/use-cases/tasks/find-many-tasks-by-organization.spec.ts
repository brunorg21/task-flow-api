import { InMemoryTaskRepository } from "@/repositories/in-memory-repositories/in-memory-task-repository";
import { beforeEach, describe, expect, it } from "vitest";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { FindManyTasksByOrganizationUseCase } from "./find-many-tasks-by-organization";
import { InMemoryAttachmentRepository } from "@/repositories/in-memory-repositories/in-memory-attachment-repository";

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

    const tasks = await sut.execute("org-id");

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({ organizationId: "org-id" }),
      expect.objectContaining({ organizationId: "org-id" }),
    ]);
  });

  it("should not be able to find many task by organization with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
