import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditOrganizationUseCase } from "./edit";
import { makeOrganization } from "../factories/make-organization";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;

let sut: EditOrganizationUseCase;

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
  sut = new EditOrganizationUseCase(inMemoryOrganizationRepository);
});

describe("edit organization use case", () => {
  it("should be able to edit an organization", async () => {
    const organization = await makeOrganization(inMemoryOrganizationRepository);

    await sut.execute({
      name: "org-2",
      organizationId: organization.id,
    });

    expect(inMemoryOrganizationRepository.items[0].name).toEqual("org-2");
  });
});
