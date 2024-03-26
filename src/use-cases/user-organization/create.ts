import { UserOrganizationRepository } from "@/repositories/user-organization-repository";
import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials";

export class CreateUserOrganizationUseCase {
  constructor(
    private userOrganizationRepository: UserOrganizationRepository,
    private userRepository: UserRepository
  ) {}

  async execute(email: string, organizationId: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const userOrganization = await this.userOrganizationRepository.create({
      organizationId,
      userId: user.id,
    });

    return {
      userOrganization,
    };
  }
}
