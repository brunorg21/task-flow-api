import {
  IOrganization,
  IOrganizationCreate,
} from "@/models/organization-model";

export interface OrganizationRepository {
  create(data: IOrganizationCreate): Promise<IOrganization>;
}
