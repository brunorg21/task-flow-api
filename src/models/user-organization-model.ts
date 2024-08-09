import { IUser } from "./user-model";

export interface IUserOrganization {
  userId: string;
  organizationId: string;
  user?: IUser;
}
