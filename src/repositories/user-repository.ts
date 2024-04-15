import { IUser, IUserCreate } from "@/models/user-model";

export interface UserRepository {
  create(data: IUserCreate): Promise<IUser>;
  save(user: IUser): Promise<void>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(userId: string): Promise<IUser | null>;
}
