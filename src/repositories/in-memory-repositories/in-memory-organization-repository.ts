import {
  IOrganizationCreate,
  IOrganization,
} from "@/models/organization-model";
import { OrganizationRepository } from "../organization-repository";
import { randomUUID } from "crypto";
import { IUser } from "@/models/user-model";
import { UserRepository } from "../user-repository";
import { InMemoryUserRepository } from "./in-memory-user-repository";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  constructor(private userRepository?: InMemoryUserRepository) {}

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

  async assignUser(
    userId: string,
    organizationId: string
  ): Promise<IUser | null> {
    const user = this.userRepository?.items.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    user.organizationId = organizationId;

    return user;
  }
}
