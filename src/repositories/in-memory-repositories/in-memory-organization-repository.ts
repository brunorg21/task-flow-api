import {
  IOrganizationCreate,
  IOrganization,
} from "@/models/organization-model";
import { OrganizationRepository } from "../organization-repository";
import { randomUUID } from "crypto";
import { IUserOrganization } from "@/models/user-organization-model";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: IOrganization[] = [];

  async create(data: IOrganizationCreate): Promise<IOrganization> {
    const org = {
      id: randomUUID(),
      name: data.name,
      createdAt: data.createdAt,
      ownerId: data.ownerId,
      slug: data.slug,
    } as IOrganization;

    this.items.push(org);

    return org;
  }

  async findBySlug(name: string): Promise<IOrganization | null> {
    const org = this.items.find((e) => e.slug === name);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByName(name: string): Promise<IOrganization | null> {
    const organization = this.items.find((e) => e.name === name);

    if (!organization) {
      return null;
    }

    return organization;
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

  async findMany(
    userOrganizations: IUserOrganization[]
  ): Promise<IOrganization[]> {
    const organizations = this.items.filter((organization) => {
      return userOrganizations.some(
        (userOrg) => userOrg.organizationId === organization.id
      );
    });

    return organizations;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }

  async save(organization: IOrganization): Promise<void> {
    const organizationIndex = this.items.findIndex(
      (item) => item.id === organization.id
    );

    this.items[organizationIndex] = organization;
  }
}
