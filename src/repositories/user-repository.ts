import { IUser, IUserCreate } from "@/models/user-model";

export interface UserRepository {
  create(data: IUserCreate): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(userId: string): Promise<IUser | null>;
}
