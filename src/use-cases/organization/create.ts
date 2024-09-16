import { IOrganizationCreate } from "@/models/organization-model";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";
import { OrganizationWithSameNameError } from "../@errors/organization-with-same-name-error";

export class CreateOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userOrganizationRepository: UserOrganizationRepository
  ) {}

  async execute(data: IOrganizationCreate, userId: string) {
    const org = await this.organizationRepository.findBySlug(data.slug!);

    if (org) {
      throw new OrganizationWithSameNameError();
    }

    const createdOrg = await this.organizationRepository.create(data);

    await this.userOrganizationRepository.create({
      organizationId: createdOrg.id,
      userId,
    });
    return createdOrg;
  }
}
