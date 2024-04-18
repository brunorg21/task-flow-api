import { pgTable, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "./users";
import { organizationSchema } from "./organization";
import { relations } from "drizzle-orm";

export const userOrganization = pgTable("userOrganization", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .references(() => userSchema.id, { onDelete: "set null" })
    .notNull(),
  organizationId: uuid("organizationId")
    .references(() => organizationSchema.id, { onDelete: "set null" })
    .notNull(),
});

export const userOrganizationRelations = relations(
  userOrganization,
  ({ one }) => ({
    user: one(userSchema, {
      fields: [userOrganization.userId],
      references: [userSchema.id],
      relationName: "user",
    }),
    organization: one(organizationSchema, {
      fields: [userOrganization.organizationId],
      references: [organizationSchema.id],
    }),
  })
);
