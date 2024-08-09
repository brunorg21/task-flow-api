import { IUserOrganization } from "@/models/user-organization-model";
import { UserOrganizationRepository } from "../user-organization-repository";
import { db } from "@/db/connection";
import { userOrganization } from "@/db/schemas";
import { and, eq } from "drizzle-orm";

export class DrizzleUserOrganizationRepository
  implements UserOrganizationRepository
{
  async create(data: IUserOrganization): Promise<IUserOrganization> {
    const createdUserOrganization = await db
      .insert(userOrganization)
      .values({
        organizationId: data.organizationId,
        userId: data.userId,
      })
      .returning({
        userId: userOrganization.userId,
        organizationId: userOrganization.organizationId,
      });

    return createdUserOrganization[0];
  }

  async findByUser(userId: string): Promise<IUserOrganization[]> {
    const userOrganizations = await db.query.userOrganization.findMany({
      where(fields, { eq }) {
        return eq(fields.userId, userId);
      },
    });

    return userOrganizations;
  }

  async findByOrganization(
    organizationId: string
  ): Promise<IUserOrganization[]> {
    const userOrganizations = await db.query.userOrganization.findMany({
      where(fields, { eq }) {
        return eq(fields.organizationId, organizationId);
      },
      with: {
        user: {
          columns: {
            id: true,
            username: true,
            password: true,
            email: true,
          },
        },
      },
    });

    return userOrganizations;
  }

  async delete(userId: string, orgId: string): Promise<void> {
    await db
      .delete(userOrganization)
      .where(
        and(
          eq(userOrganization.userId, userId),
          eq(userOrganization.organizationId, orgId)
        )
      );
  }
}
