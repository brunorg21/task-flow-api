import { InMemoryUserOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-user-organization-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserOrganizationUseCase } from "./create";
import { hash } from "bcrypt";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory-repositories/in-memory-organization-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials";

let inMemoryUserOrganizationRepository: InMemoryUserOrganizationRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let sut: CreateUserOrganizationUseCase;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  inMemoryUserOrganizationRepository = new InMemoryUserOrganizationRepository();
  sut = new CreateUserOrganizationUseCase(
    inMemoryUserOrganizationRepository,
    inMemoryUserRepository
  );
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
});

describe("create user organization use case", () => {
  it("should be able to create user organization", async () => {
    const createdUser = await inMemoryUserRepository.create({
      email: "bruno@email.com",
      password: await hash("123456", 6),
      username: "Bruno",
    });

    const org = await inMemoryOrganizationRepository.create({
      createdAt: new Date(),
      name: "Empresa 1",
    });

    const { userOrganization } = await sut.execute(createdUser.email, org.id);

    expect(userOrganization.organizationId).toEqual(expect.any(String));
  });

  it("should not be able to create user organization with non-existent user email", async () => {
    await inMemoryUserRepository.create({
      email: "bruno@email.com",

      password: await hash("123456", 6),
      username: "Bruno",
    });

    const org = await inMemoryOrganizationRepository.create({
      createdAt: new Date(),
      name: "Empresa 1",
    });

    expect(async () => {
      await sut.execute("non-existent", org.id);
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
