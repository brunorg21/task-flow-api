import { InviteRepository } from "@/repositories/invite-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class FindInviteByIdUseCase {
  constructor(private inviteRepository: InviteRepository) {}

  async execute(inviteId: string) {
    const invite = await this.inviteRepository.findById(inviteId);

    if (!invite) {
      throw new ResourceNotFoundError();
    }

    return { invite };
  }
}
