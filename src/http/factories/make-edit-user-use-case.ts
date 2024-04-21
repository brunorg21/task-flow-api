import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { EditUserUseCase } from "@/use-cases/users/edit";

export function makeEditUserUseCase() {
  const drizzleRepository = new DrizzleUserRepository();

  const editUserUseCase = new EditUserUseCase(drizzleRepository);

  return editUserUseCase;
}
