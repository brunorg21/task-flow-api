import { InMemoryUserOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-user-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "../@errors/invalid-credentials";
import { FindByUserUseCase } from "./find-by-user";

let inMemoryUserOrganizationRepository: InMemoryUserOrganizationRepository;
let sut: FindByUserUseCase;

beforeEach(() => {
  inMemoryUserOrganizationRepository = new InMemoryUserOrganizationRepository();
  sut = new FindByUserUseCase(inMemoryUserOrganizationRepository);
});

describe("find user organizations by user use case", () => {
  it("should be able to find user organizations by user", async () => {
    const userOrganization = await inMemoryUserOrganizationRepository.create({
      organizationId: "org-01",
      userId: "user-01",
    });

    const { usersOrganization } = await sut.execute("user-01");

    expect(usersOrganization[0].userId).toEqual("user-01");
  });
});
