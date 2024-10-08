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

  async findByUser(userId: string): Promise<IUserOrganization[]> {
    const userOrganizations = this.items.filter(
      (userOrganization) => userOrganization.userId === userId
    );

    return userOrganizations;
  }
  async findByOrganization(
    organizationId: string
  ): Promise<IUserOrganization[]> {
    const userOrganizations = this.items.filter(
      (userOrganization) => userOrganization.organizationId === organizationId
    );

    return userOrganizations;
  }

  async delete(userId: string, orgId: string): Promise<void> {
    const userOrganizations = this.items.filter(
      (item) => item.organizationId !== orgId && item.userId !== userId
    );

    this.items = userOrganizations;
  }
}
