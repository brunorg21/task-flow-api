import { IOrganizationCreate } from "@/models/organization-model";
import { OrganizationRepository } from "@/repositories/organization-repository";

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(data: IOrganizationCreate) {
    const org = await this.organizationRepository.create(data);

    return org;
  }
}
