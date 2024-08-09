import {
  IOrganization,
  IOrganizationCreate,
} from "@/models/organization-model";
import { IUserOrganization } from "@/models/user-organization-model";

export interface OrganizationRepository {
  create(data: IOrganizationCreate): Promise<IOrganization>;
  findById(id: string): Promise<IOrganization | null>;
  save(organization: IOrganization): Promise<void>;
  delete(id: string): Promise<void>;
  findMany(userOrganizations: IUserOrganization[]): Promise<IOrganization[]>;
  findBySlug(name: string): Promise<IOrganization | null>;
}
