import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create";
import { hash } from "bcrypt";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  sut = new CreateUserUseCase(inMemoryUserRepository);
});

describe("create user use case", () => {
  it("should be able to create a user", async () => {
    const user = await sut.execute({
      email: "bruno@email.com",
      password: await hash("123456", 6),
      username: "bruno",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
