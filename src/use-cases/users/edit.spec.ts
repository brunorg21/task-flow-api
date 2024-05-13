import { InMemoryUserRepository } from "@/repositories/in-memory-repositories/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditUserUseCase } from "./edit";
import { makeUser } from "../factories/make-user";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

let inMemoryUserRepository: InMemoryUserRepository;

let sut: EditUserUseCase;

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  sut = new EditUserUseCase(inMemoryUserRepository);
});

describe("edit user use case", () => {
  it("should be able to edit an user", async () => {
    const user = await makeUser(inMemoryUserRepository);

    await sut.execute({
      userId: user.id,
      email: "bruno-rafael@email.com",
      username: "Rafael",
    });

    expect(inMemoryUserRepository.items[0].username).toEqual("Rafael");
    expect(inMemoryUserRepository.items[0].email).toEqual(
      "bruno-rafael@email.com"
    );
  });

  it("should not be able to edit an user with wrong id", async () => {
    expect(
      async () =>
        await sut.execute({
          userId: "user-1",
          email: "bruno-rafael@email.com",
          username: "Rafael",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
