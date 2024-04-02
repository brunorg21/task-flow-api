import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { taskSchema } from "./tasks";

export const userSchema = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  tasks: many(taskSchema),
}));
