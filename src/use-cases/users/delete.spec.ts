import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteUserUseCase } from "./delete";
import { makeUser } from "../factories/make-user";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let inMemoryUserRepository: InMemoryUserRepository;

let sut: DeleteUserUseCase;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  sut = new DeleteUserUseCase(inMemoryUserRepository);
});

describe("delete user use case", () => {
  it("should be able to delete an user", async () => {
    const newUser = await makeUser(inMemoryUserRepository);

    await sut.execute(newUser.id);

    expect(inMemoryUserRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an user with wrong id", async () => {
    expect(async () => await sut.execute("user-4")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
