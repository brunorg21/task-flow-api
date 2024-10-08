import { IUserOrganization } from "@/models/user-organization-model";

export interface UserOrganizationRepository {
  create(data: IUserOrganization): Promise<IUserOrganization>;
  findByUser(userId: string): Promise<IUserOrganization[]>;
  delete(userId: string, orgId: string): Promise<void>;
  findByOrganization(slug: string): Promise<IUserOrganization[]>;
}
