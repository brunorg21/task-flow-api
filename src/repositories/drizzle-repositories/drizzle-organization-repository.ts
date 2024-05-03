import {
  IOrganizationCreate,
  IOrganization,
} from "@/models/organization-model";
import { OrganizationRepository } from "../organization-repository";
import { db } from "@/db/connection";
import { organizationSchema } from "@/db/schemas";
import { eq } from "drizzle-orm";

export class DrizzleOrganizationRepository implements OrganizationRepository {
  async create(data: IOrganizationCreate): Promise<IOrganization> {
    const organization = await db
      .insert(organizationSchema)
      .values(data)
      .returning({
        id: organizationSchema.id,
        name: organizationSchema.name,
        createdAt: organizationSchema.createdAt,
      });

    return organization[0];
  }

  async findById(id: string): Promise<IOrganization | null> {
    const organization = await db.query.organizationSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id);
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async save(organization: IOrganization): Promise<void> {
    await db
      .update(organizationSchema)
      .set(organization)
      .where(eq(organizationSchema.id, organization.id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(organizationSchema).where(eq(organizationSchema.id, id));
  }
}
