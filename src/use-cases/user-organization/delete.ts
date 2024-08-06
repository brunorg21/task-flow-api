import { UserOrganizationRepository } from "@/repositories/user-organization-repository";

export class DeleteUserOrganizationUseCase {
  constructor(private userOrganizationRepository: UserOrganizationRepository) {}

  async execute(userId: string, orgId: string) {
    await this.userOrganizationRepository.delete(userId, orgId);
  }
}
