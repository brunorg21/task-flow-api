import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcrypt";

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
      organizationId: null,
      password: await hash("12345", 6),
      username: "bruno",
    });

    const { user } = await sut.execute({
      email: "bruno@email.com",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
