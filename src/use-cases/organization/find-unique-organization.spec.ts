import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindUniqueOrganizationUseCase } from "./find-unique-organization";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let sut: FindUniqueOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  sut = new FindUniqueOrganizationUseCase(inMemoryOrganizationRepository);
});

describe("find organization by id use case", () => {
  it("should be able to find organization", async () => {
    const organizationCreated = await inMemoryOrganizationRepository.create({
      createdAt: new Date(),
      name: "Organization 1",
    });

    const organization = await sut.execute(organizationCreated.id);

    expect(organization.name).toEqual("Organization 1");
  });

  it("should not be able to find organization with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
