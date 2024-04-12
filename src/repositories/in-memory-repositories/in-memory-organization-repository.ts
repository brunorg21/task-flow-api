import {
  IOrganizationCreate,
  IOrganization,
} from "@/models/organization-model";
import { OrganizationRepository } from "../organization-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: IOrganization[] = [];

  async create(data: IOrganizationCreate): Promise<IOrganization> {
    const org = {
      id: randomUUID(),
      name: data.name,
      createdAt: data.createdAt,
    } as IOrganization;

    this.items.push(org);

    return org;
  }

  async findById(id: string): Promise<IOrganization | null> {
    const organization = this.items.find(
      (organization) => organization.id === id
    );

    if (!organization) {
      return null;
    }

    return organization;
  }

  async save(organization: IOrganization): Promise<void> {
    const organizationIndex = this.items.findIndex(
      (item) => item.id === organization.id
    );

    this.items[organizationIndex] = organization;
  }
}
