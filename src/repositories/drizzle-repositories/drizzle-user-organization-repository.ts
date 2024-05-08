import { IUserOrganization } from "@/models/user-organization-model";
import { UserOrganizationRepository } from "../user-organization-repository";
import { db } from "@/db/connection";
import { userOrganization } from "@/db/schemas";

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

  async findByUser(userId: string): Promise<IUserOrganization | null> {
    const userOrganization = await db.query.userOrganization.findFirst({
      where(fields, { eq }) {
        return eq(fields.userId, userId);
      },
    });

    if (!userOrganization) {
      return null;
    }

    return userOrganization;
  }
}
