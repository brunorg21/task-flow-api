import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { CreateUserUseCase } from "@/use-cases/users/create";

export function makeCreateUserUseCase() {
  const drizzleRepository = new DrizzleUserRepository();

  const createUserUseCase = new CreateUserUseCase(drizzleRepository);

  return createUserUseCase;
}
