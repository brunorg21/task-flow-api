import { IInviteCreate } from "@/models/invite-model";

import { InviteRepository } from "@/repositories/invite-repository";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";
import { UserInSameOrganizationError } from "../@errors/user-in-same-organization-error";
import { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { UserNotFoundError } from "../@errors/user-not-found-error";

export class CreateInviteUseCase {
  constructor(
    private inviteRepository: InviteRepository,
    private userOrganizationRepository: UserOrganizationRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    email,
    organizationId,
    senderId,
  }: {
    organizationId: string;
    senderId: string;
    email: string;
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const userOrganization = await this.userOrganizationRepository.findByUser(
      user.id
    );

    if (
      userOrganization.some((item) => item.organizationId === organizationId)
    ) {
      throw new UserInSameOrganizationError();
    }
    const invite = await this.inviteRepository.create({
      organizationId,
      senderId,
      recipientId: user.id,
    });

    return { invite };
  }
}
