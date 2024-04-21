import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { GetProfileUseCase } from "@/use-cases/users/profile";

export function makeProfileUseCase() {
  const drizzleRepository = new DrizzleUserRepository();

  const getProfileUseCase = new GetProfileUseCase(drizzleRepository);

  return getProfileUseCase;
}
