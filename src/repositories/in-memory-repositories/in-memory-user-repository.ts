import { IUserCreate, IUser } from "@/models/user-model";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  public items: IUser[] = [];

  async create(data: IUserCreate): Promise<IUser> {
    const user = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      username: data.username,
    } as IUser;

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = this.items.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
