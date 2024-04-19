import { pgTable, text } from "drizzle-orm/pg-core";
import { userSchema } from "./users";
import { organizationSchema } from "./organization";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const userOrganization = pgTable("userOrganization", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: text("userId")
    .references(() => userSchema.id)
    .notNull(),
  organizationId: text("organizationId")
    .references(() => organizationSchema.id)
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
