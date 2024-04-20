import { DrizzleUserRepository } from "@/repositories/drizzle-repositories/drizzle-user-repository";
import { AuthenticateUseCase } from "@/use-cases/users/authenticate";

export function makeAuthenticateUseCase() {
  const drizzleUserRepository = new DrizzleUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(drizzleUserRepository);
  return authenticateUseCase;
}
