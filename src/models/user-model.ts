export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  organizationId: string | null;
}

export type IUserCreate = Omit<IUser, "id">;

export interface IAssignUser {
  organizationId: number;
  email: string;
}

export interface IAuthenticate {
  email: string;
  password: string;
}
