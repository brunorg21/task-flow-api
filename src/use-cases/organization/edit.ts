import { IOrganization } from "@/models/organization-model";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface EditOrganizationUseCaseRequest {
  organizationId: string;
  name: string;
}

export class EditOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({ name, organizationId }: EditOrganizationUseCaseRequest) {
    const org = await this.organizationRepository.findById(organizationId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    org.name = name;

    await this.organizationRepository.save(org);
  }
}
