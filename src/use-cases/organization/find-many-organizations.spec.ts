import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindManyOrganizationUseCase } from "./find-many-organizations";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryUserOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-user-organization-repository";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let inMemoryUserOrganizationRepository: InMemoryUserOrganizationRepository;
let sut: FindManyOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  inMemoryUserOrganizationRepository = new InMemoryUserOrganizationRepository();
  sut = new FindManyOrganizationUseCase(
    inMemoryOrganizationRepository,
    inMemoryUserOrganizationRepository
  );
});

describe("find many organization use case", () => {
  it("should be able to find many organization", async () => {
    const organizationCreated = await inMemoryOrganizationRepository.create({
      createdAt: new Date(),
      name: "Organization 1",
      ownerId: "user-01",
      slug: "organization-1",
    });

    await inMemoryUserOrganizationRepository.create({
      userId: "user-1",
      organizationId: organizationCreated.id,
    });

    const { organizations } = await sut.execute({
      userId: "user-1",
    });

    expect(organizations[0].name).toEqual("Organization 1");
  });
});
