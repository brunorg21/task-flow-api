import { inviteSchema } from "@/db/schemas/invite";
import { InviteRepository } from "../invite-repository";
import { IInviteCreate, IInvite } from "@/models/invite-model";
import { db } from "@/db/connection";
import { eq } from "drizzle-orm";

export class DrizzleInviteRepository implements InviteRepository {
  async create(invite: IInviteCreate): Promise<IInvite> {
    const inviteCreated = await db
      .insert(inviteSchema)
      .values(invite)
      .returning({
        id: inviteSchema.id,
        organizationId: inviteSchema.organizationId,
        senderId: inviteSchema.senderId,
        recipientId: inviteSchema.recipientId,
        invitationAccepted: inviteSchema.invitationAccepted,
        createdAt: inviteSchema.createdAt,
      });

    return inviteCreated[0];
  }
  async findInvitationsSend(senderId: string): Promise<IInvite[]> {
    const invites = await db.query.inviteSchema.findMany({
      where(fields, { and, eq }) {
        return eq(fields.senderId, senderId);
      },
      with: {
        sender: true,
        organization: true,
        recipient: true,
      },
    });

    return invites;
  }
  async findInvitationsReceived(recipientId: string): Promise<IInvite[]> {
    const invites = await db.query.inviteSchema.findMany({
      where(fields, { eq }) {
        return eq(fields.recipientId, recipientId);
      },
      with: {
        recipient: true,
        organization: true,
        sender: true,
      },
    });

    return invites;
  }

  async findById(inviteId: string): Promise<IInvite | null> {
    const invite = await db.query.inviteSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, inviteId);
      },
    });

    if (!invite) {
      return null;
    }

    return invite;
  }

  async acceptInvitation(invite: IInvite): Promise<void> {
    await db
      .update(inviteSchema)
      .set({
        ...invite,
        invitationAccepted: true,
      })
      .where(eq(inviteSchema.id, invite.id));
  }

  async cancelInvite(invite: IInvite): Promise<void> {
    await db.delete(inviteSchema).where(eq(inviteSchema.id, invite.id));
  }
}
