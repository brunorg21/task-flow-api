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
  async save(user: IUser): Promise<void> {
    await db.update(userSchema).set(user).where(eq(userSchema.id, user.id));
  }
  async delete(id: string): Promise<void> {
    await db.delete(userSchema).where(eq(userSchema.id, id));
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
  async findById(userId: string): Promise<IUser | null> {
    const user = await db.query.userSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, userId);
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
