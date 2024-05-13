import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { UserOrganizationRepository } from "@/repositories/user-organization-repository";
import { IOrganization } from "@/models/organization-model";

interface FindManyOrganizationUseCaseRequest {
  userId: string;
}
interface FindManyOrganizationUseCaseResponse {
  organizations: IOrganization[];
}

export class FindManyOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userOrganizationRepository: UserOrganizationRepository
  ) {}

  async execute({
    userId,
  }: FindManyOrganizationUseCaseRequest): Promise<FindManyOrganizationUseCaseResponse> {
    const userOrganizations = await this.userOrganizationRepository.findByUser(
      userId
    );
    const organizations = await this.organizationRepository.findMany(
      userOrganizations
    );

    return { organizations };
  }
}
