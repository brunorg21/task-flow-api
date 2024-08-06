import { createId } from "@paralleldrive/cuid2";
import { timestamp, pgTable, text, boolean } from "drizzle-orm/pg-core";
import { userSchema } from "./users";
import { relations } from "drizzle-orm";
import { organizationSchema } from "./organization";

export const inviteSchema = pgTable("invite", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  organizationId: text("organizationId")
    .references(() => organizationSchema.id)
    .notNull(),
  recipientId: text("recipientId")
    .references(() => userSchema.id)
    .notNull(),
  senderId: text("senderId")
    .references(() => userSchema.id)
    .notNull(),
  invitationAccepted: boolean("invitationAccepted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const inviteRelations = relations(inviteSchema, ({ one }) => ({
  recipient: one(userSchema, {
    fields: [inviteSchema.recipientId],
    references: [userSchema.id],
    relationName: "invite-recipient",
  }),
  sender: one(userSchema, {
    fields: [inviteSchema.senderId],
    references: [userSchema.id],
    relationName: "invite-sender",
  }),
  organization: one(organizationSchema, {
    fields: [inviteSchema.organizationId],
    references: [organizationSchema.id],
    relationName: "invite-organization",
  }),
}));
