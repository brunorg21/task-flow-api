import { DrizzleInviteRepository } from "@/repositories/drizzle-repositories/drizzle-invite-repository";
import { CancelInviteUseCase } from "@/use-cases/invites/cancel-invite";

export function makeCancelInviteUseCase() {
  const drizzleInviteRepository = new DrizzleInviteRepository();

  const cancelInviteUseCase = new CancelInviteUseCase(drizzleInviteRepository);

  return cancelInviteUseCase;
}
