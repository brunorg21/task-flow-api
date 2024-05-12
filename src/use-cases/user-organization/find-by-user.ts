import { UserOrganizationRepository } from "@/repositories/user-organization-repository";

export class FindByUserUseCase {
  constructor(private userOrganizationRepository: UserOrganizationRepository) {}

  async execute(userId: string) {
    const usersOrganization = await this.userOrganizationRepository.findByUser(
      userId
    );

    return {
      usersOrganization,
    };
  }
}
