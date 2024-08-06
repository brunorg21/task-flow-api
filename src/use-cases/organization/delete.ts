import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";

export class DeleteOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userOrganizationRepository: UserOrganizationRepository
  ) {}

  async execute(id: string, userId: string) {
    const org = await this.organizationRepository.findById(id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    await this.userOrganizationRepository.delete(userId, org.id);
    await this.organizationRepository.delete(org.id);
  }
}
