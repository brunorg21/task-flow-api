import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteOrganizationUseCase } from "./delete";
import { makeOrganization } from "../factories/make-organization";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryUserOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-user-organization-repository";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let inMemoryUserOrganizationRepository: InMemoryUserOrganizationRepository;

let sut: DeleteOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  inMemoryUserOrganizationRepository = new InMemoryUserOrganizationRepository();
  sut = new DeleteOrganizationUseCase(
    inMemoryOrganizationRepository,
    inMemoryUserOrganizationRepository
  );
});

describe("delete organization use case", () => {
  it("should be able to delete an organization", async () => {
    const newOrg = await makeOrganization(inMemoryOrganizationRepository);

    await sut.execute(newOrg.id, "user-id");

    expect(inMemoryOrganizationRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an organization with wrong id", async () => {
    expect(
      async () => await sut.execute("org-4", "user-id")
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
