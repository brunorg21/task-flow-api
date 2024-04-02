import { date, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { userSchema } from "./users";

const statusTypeEnum = pgEnum("status", [
  "Em andamento",
  "Concluída",
  "Cancelada",
]);

export const taskSchema = pgTable("tasks", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: date("createdAt").defaultNow(),
  userId: uuid("userId")
    .references(() => userSchema.id, { onDelete: "set null" })
    .notNull(),
  organizationId: uuid("organizationId"),
  assignedId: uuid("assignedId").references(() => userSchema.id, {
    onDelete: "set null",
  }),
  status: statusTypeEnum("status").default("Em andamento").notNull(),
  attachment: text("attachment"),
  noteId: uuid("noteId"),
});

export const taskRelations = relations(taskSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [taskSchema.userId, taskSchema.assignedId],
    references: [userSchema.id, userSchema.id],
    relationName: "task-user",
  }),
}));
