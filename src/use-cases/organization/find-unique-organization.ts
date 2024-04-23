import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

export class FindUniqueOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(id: string) {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    return organization;
  }
}
