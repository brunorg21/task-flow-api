import { IOrganizationCreate } from "@/models/organization-model";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";

export class CreateOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userOrganizationRepository: UserOrganizationRepository
  ) {}

  async execute(data: IOrganizationCreate, userId: string) {
    const org = await this.organizationRepository.create(data);
    await this.userOrganizationRepository.create({
      organizationId: org.id,
      userId,
    });
    return org;
  }
}
