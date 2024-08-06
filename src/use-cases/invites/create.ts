import { IInviteCreate } from "@/models/invite-model";

import { InviteRepository } from "@/repositories/invite-repository";

export class CreateInviteUseCase {
  constructor(private inviteRepository: InviteRepository) {}

  async execute(data: IInviteCreate) {
    const invite = await this.inviteRepository.create(data);
    
    //TODO: make validations where user already exists on organization

    return { invite };
  }
}
