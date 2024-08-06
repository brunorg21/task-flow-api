import { InviteRepository } from "@/repositories/invite-repository";

export class FindInvitationsSendUseCase {
  constructor(private inviteRepository: InviteRepository) {}

  async execute(senderId: string) {
    const invites = await this.inviteRepository.findInvitationsSend(senderId);

    return { invites };
  }
}
