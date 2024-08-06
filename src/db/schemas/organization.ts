import { createId } from "@paralleldrive/cuid2";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";
import { userSchema } from "./users";
import { relations } from "drizzle-orm";
import { inviteSchema } from "./invite";

export const organizationSchema = pgTable("organization", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  ownerId: text("ownerId")
    .references(() => userSchema.id)
    .notNull(),
});

export const organizationRelations = relations(
  organizationSchema,
  ({ one, many }) => ({
    user: one(userSchema, {
      fields: [organizationSchema.ownerId],
      references: [userSchema.id],
      relationName: "organization-owner",
    }),
    invites: many(inviteSchema),
  })
);
