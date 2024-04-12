export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
}

export type IUserCreate = Omit<IUser, "id">;

export interface IAuthenticate {
  email: string;
  password: string;
}
