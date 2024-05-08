import { IUserOrganization } from "@/models/user-organization-model";
import { UserOrganizationRepository } from "../user-organization-repository";

export class InMemoryUserOrganizationRepository
  implements UserOrganizationRepository
{
  public items: IUserOrganization[] = [];

  async create({
    userId,
    organizationId,
  }: IUserOrganization): Promise<IUserOrganization> {
    const userOrganization = {
      userId,
      organizationId,
    };

    this.items.push(userOrganization);

    return userOrganization;
  }

  async findByUser(userId: string): Promise<IUserOrganization | null> {
    const userOrganization = this.items.find(
      (userOrganization) => userOrganization.userId === userId
    );

    if (!userOrganization) {
      return null;
    }

    return userOrganization;
  }
}
