import { text, uuid } from "drizzle-orm/pg-core";
import { taskFlowschema } from "./index";
import { relations } from "drizzle-orm";
import { taskSchema } from "./tasks";

export const userSchema = taskFlowschema.table("users", {
  id: uuid("id").primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  tasks: many(taskSchema),
}));
