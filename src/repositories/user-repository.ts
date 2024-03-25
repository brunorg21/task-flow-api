import {
  IAssignUser,
  IAuthenticate,
  IUser,
  IUserCreate,
} from "@/models/user-model";

export interface UserRepository {
  create(data: IUserCreate): Promise<IUser>;
  assignUser(data: IAssignUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
