import { IOrganization } from "@/models/organization-model";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class DeleteOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(id: string) {
    const org = await this.organizationRepository.findById(id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    await this.organizationRepository.delete(org.id);
  }
}
