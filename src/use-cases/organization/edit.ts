import { IOrganization } from "@/models/organization-model";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { createSlug } from "@/utils/create-slug";
import { OrganizationWithSameNameError } from "../@errors/organization-with-same-name-error";

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

    const orgWithSameSlug = await this.organizationRepository.findBySlug(
      createSlug(name)
    );

    if (orgWithSameSlug) {
      throw new OrganizationWithSameNameError();
    }

    org.name = name;

    await this.organizationRepository.save(org);
  }
}
