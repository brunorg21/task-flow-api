import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "../@errors/invalid-credentials";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  sut = new AuthenticateUseCase(inMemoryUserRepository);
});

describe("authenticate user use case", () => {
  it("should be able to authenticate", async () => {
    await inMemoryUserRepository.create({
      email: "bruno@email.com",
      password: await hash("12345", 6),
      username: "bruno",
    });

    const { user } = await sut.execute({
      email: "bruno@email.com",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(async () => {
      await sut.execute({
        email: "email@aaa.com",
        password: "aaaa",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to authenticate with wrong password", async () => {
    await inMemoryUserRepository.create({
      email: "bruno@email.com",
      password: await hash("12345", 6),
      username: "bruno",
    });

    await expect(async () => {
      await sut.execute({
        email: "bruno@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
