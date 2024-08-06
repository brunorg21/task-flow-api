import { pgTable, text } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { taskSchema } from "./tasks";
import { createId } from "@paralleldrive/cuid2";
import { inviteSchema } from "./invite";

export const userSchema = pgTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  tasks: many(taskSchema),
  invites: many(inviteSchema),
}));
