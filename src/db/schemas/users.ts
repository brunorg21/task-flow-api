import { text, uuid } from "drizzle-orm/pg-core";
import { taskFlowschema } from "./index";

export const userSchema = taskFlowschema.table("users", {
  id: uuid("id").primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});
