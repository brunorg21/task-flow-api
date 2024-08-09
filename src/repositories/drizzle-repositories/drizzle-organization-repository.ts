import {
  IOrganizationCreate,
  IOrganization,
} from "@/models/organization-model";
import { OrganizationRepository } from "../organization-repository";
import { db } from "@/db/connection";
import { organizationSchema } from "@/db/schemas";
import { eq, inArray } from "drizzle-orm";
import { IUserOrganization } from "@/models/user-organization-model";
import { createSlug } from "@/utils/create-slug";

export class DrizzleOrganizationRepository implements OrganizationRepository {
  async create(data: IOrganizationCreate): Promise<IOrganization> {
    const organization = await db
      .insert(organizationSchema)
      .values(data)
      .returning({
        id: organizationSchema.id,
        name: organizationSchema.name,
        createdAt: organizationSchema.createdAt,
        slug: organizationSchema.slug,
        ownerId: organizationSchema.ownerId,
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

  async findBySlug(slug: string): Promise<IOrganization | null> {
    const organization = await db.query.organizationSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.slug, slug);
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findMany(
    userOrganizations: IUserOrganization[]
  ): Promise<IOrganization[]> {
    const organizationIds = userOrganizations.map(
      (userOrganization) => userOrganization.organizationId
    );

    if (organizationIds.length === 0) {
      return [];
    }

    const organizations = await db.query.organizationSchema.findMany({
      where(fields, { inArray }) {
        return inArray(fields.id, organizationIds);
      },
      with: {
        user: {
          columns: {
            email: true,
            id: true,
            username: true,
            password: false,
          },
        },
      },
      orderBy: (organization, { desc }) => [desc(organization.createdAt)],
    });

    return organizations;
  }

  async save(organization: IOrganization): Promise<void> {
    await db
      .update(organizationSchema)
      .set({
        ...organization,
        slug: createSlug(organization.name),
      })
      .where(eq(organizationSchema.id, organization.id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(organizationSchema).where(eq(organizationSchema.id, id));
  }
}
