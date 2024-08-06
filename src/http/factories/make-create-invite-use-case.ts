import { DrizzleInviteRepository } from "@/repositories/drizzle-repositories/drizzle-invite-repository";
import { CreateInviteUseCase } from "@/use-cases/invites/create";

export function makeCreateInviteUseCase() {
  const drizzleInviteRepository = new DrizzleInviteRepository();

  const createInviteUseCase = new CreateInviteUseCase(drizzleInviteRepository);

  return createInviteUseCase;
}
