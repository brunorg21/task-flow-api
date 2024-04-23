import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteOrganizationUseCase } from "./delete";
import { makeOrganization } from "../factories/make-organization";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;

let sut: DeleteOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  sut = new DeleteOrganizationUseCase(inMemoryOrganizationRepository);
});

describe("delete organization use case", () => {
  it("should be able to delete an organization", async () => {
    const newOrg = await makeOrganization(inMemoryOrganizationRepository);

    await sut.execute(newOrg.id);

    expect(inMemoryOrganizationRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an organization with wrong id", async () => {
    expect(async () => await sut.execute("org-4")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
