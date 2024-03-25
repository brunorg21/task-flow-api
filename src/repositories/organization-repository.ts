import {
  IOrganization,
  IOrganizationCreate,
} from "@/models/organization-model";
import { IUser } from "@/models/user-model";

export interface OrganizationRepository {
  create(data: IOrganizationCreate): Promise<IOrganization>;
  assignUser(userId: string, organizationId: string): Promise<IUser | null>;
}
