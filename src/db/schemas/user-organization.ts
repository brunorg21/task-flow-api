import { pgTable, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "./users";
import { organizationSchema } from "./organization";

export const userOrganization = pgTable("user-organization", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .references(() => userSchema.id, { onDelete: "set null" })
    .notNull(),
  organizationId: uuid("organizationId")
    .references(() => organizationSchema.id, { onDelete: "set null" })
    .notNull(),
});
