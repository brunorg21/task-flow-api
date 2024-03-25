import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class AssignUserUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(userId: string, organizationId: string) {
    const user = await this.organizationRepository.assignUser(
      userId,
      organizationId
    );

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
