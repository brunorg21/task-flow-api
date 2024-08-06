import { InviteRepository } from "@/repositories/invite-repository";

export class FindInvitationsReceivedUseCase {
  constructor(private inviteRepository: InviteRepository) {}

  async execute(recipientId: string) {
    const invites = await this.inviteRepository.findInvitationsReceived(
      recipientId
    );

    return { invites };
  }
}
