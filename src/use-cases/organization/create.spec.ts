import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create";
import { InMemoryUserOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-user-organization-repository";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let inMemoryUserOrganizationRepository: InMemoryUserOrganizationRepository;

let sut: CreateOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  inMemoryUserOrganizationRepository = new InMemoryUserOrganizationRepository();
  sut = new CreateOrganizationUseCase(
    inMemoryOrganizationRepository,
    inMemoryUserOrganizationRepository
  );
});

describe("create organization use case", () => {
  it("should be able to create an organization", async () => {
    const organization = await sut.execute(
      {
        createdAt: new Date(),
        name: "Empresa 1",
        ownerId: "user-01",
        slug: "empresa-01",
      },
      "user-01"
    );

    expect(organization.id).toEqual(expect.any(String));
    expect(inMemoryUserOrganizationRepository.items[0]).toEqual(
      expect.objectContaining({
        userId: "user-01",
        organizationId: organization.id,
      })
    );
  });
});
