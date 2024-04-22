import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { DeleteUserUseCase } from "@/use-cases/users/delete";

export function makeDeleteUserUseCase() {
  const drizzleRepository = new DrizzleUserRepository();

  const deleteUserUseCase = new DeleteUserUseCase(drizzleRepository);

  return deleteUserUseCase;
}
