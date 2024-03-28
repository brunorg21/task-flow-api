import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";

import { beforeEach, describe, expect, it } from "vitest";
import { GetProfileUseCase } from "./profile";
import { hash } from "bcrypt";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetProfileUseCase;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  sut = new GetProfileUseCase(inMemoryUserRepository);
});

describe("get profile use case", () => {
  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUserRepository.create({
      email: "bruno@email.com",
      password: await hash("123456", 6),
      username: "Bruno",
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(createdUser.id);
  });
});
