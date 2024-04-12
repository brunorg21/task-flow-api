export interface IOrganization {
  id: string;
  name: string;
  createdAt?: Date;
}

export type IOrganizationCreate = Omit<IOrganization, "id">;
