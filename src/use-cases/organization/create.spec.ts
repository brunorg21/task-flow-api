import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;

let sut: CreateOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  sut = new CreateOrganizationUseCase(inMemoryOrganizationRepository);
});

describe("create organization use case", () => {
  it("should be able to create an organization", async () => {
    const organization = await sut.execute({
      createdAt: new Date(),
      name: "Empresa 1",
    });

    expect(organization.id).toEqual(expect.any(String));
  });
});
