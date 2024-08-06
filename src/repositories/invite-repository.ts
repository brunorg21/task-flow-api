import { IInvite, IInviteCreate } from "@/models/invite-model";

export interface InviteRepository {
  create(invite: IInviteCreate): Promise<IInvite>;
  findInvitationsSend(senderId: string): Promise<IInvite[]>;
  findInvitationsReceived(recipientId: string): Promise<IInvite[]>;
  acceptInvitation(invite: IInvite): Promise<void>;
  findById(inviteId: string): Promise<IInvite | null>;
  cancelInvite(invite: IInvite): Promise<void>;
}
