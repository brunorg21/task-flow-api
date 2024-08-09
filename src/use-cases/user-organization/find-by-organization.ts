import { OrganizationRepository } from "@/repositories/organization-repository";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class FindByOrganizationUseCase {
  constructor(
    private userOrganizationRepository: UserOrganizationRepository,
    private organizationRepository: OrganizationRepository
  ) {}

  async execute(slug: string) {
    const organization = await this.organizationRepository.findBySlug(slug);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const usersOrganization =
      await this.userOrganizationRepository.findByOrganization(organization.id);

    return {
      usersOrganization,
    };
  }
}
