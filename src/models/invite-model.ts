export interface IInvite {
  id: string;
  organizationId: string;
  recipientId: string;
  senderId: string;
  createdAt: Date;
  invitationAccepted: boolean;
}

export type IInviteCreate = Omit<
  IInvite,
  "id" | "createdAt" | "invitationAccepted"
>;
