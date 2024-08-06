import { InviteRepository } from "@/repositories/invite-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";

export class AccepInviteUseCase {
  constructor(
    private inviteRepository: InviteRepository,
    private userOrganizationRepository: UserOrganizationRepository
  ) {}

  async execute(inviteId: string) {
    const invite = await this.inviteRepository.findById(inviteId);

    if (!invite) {
      throw new ResourceNotFoundError();
    }

    await this.inviteRepository.acceptInvitation(invite);
    await this.userOrganizationRepository.create({
      organizationId: invite.organizationId,
      userId: invite.recipientId,
    });
  }
}
