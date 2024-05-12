import { IUserOrganization } from "@/models/user-organization-model";

export interface UserOrganizationRepository {
  create(data: IUserOrganization): Promise<IUserOrganization>;
  findByUser(userId: string): Promise<IUserOrganization[]>;
}
