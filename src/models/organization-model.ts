export interface IOrganization {
  id: string;
  name: string;
  slug: string | null;
  ownerId: string;
  createdAt?: Date;
}

export type IOrganizationCreate = Omit<IOrganization, "id">;
