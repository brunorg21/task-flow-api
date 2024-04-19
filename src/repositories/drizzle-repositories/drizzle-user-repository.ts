import { IUserCreate, IUser } from "@/models/user-model";
import { UserRepository } from "../user-repository";
import { userSchema } from "@/db/schemas";
import { db } from "@/db/connection";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
  async create(data: IUserCreate): Promise<IUser> {
    const user = await db
      .insert(userSchema)
      .values({
        email: data.email,
        password: data.password,
        username: data.username,
      })
      .returning({
        id: userSchema.id,
        email: userSchema.email,
        password: userSchema.password,
        username: userSchema.username,
      });

    return user[0];
  }
  save(user: IUser): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string): Promise<IUser | null> {
    const user = await db.query.userSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email);
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
  findById(userId: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}
