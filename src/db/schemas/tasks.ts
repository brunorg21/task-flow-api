import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { userSchema } from "./users";
import { noteSchema } from "./note";
import { createId } from "@paralleldrive/cuid2";

export const statusTypeEnum = pgEnum("status_task", [
  "Em andamento",
  "Concluída",
  "Cancelada",
]);

export const taskSchema = pgTable("tasks", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  userId: text("userId")
    .references(() => userSchema.id)
    .notNull(),
  organizationId: text("organizationId"),
  assignedId: text("assignedId").references(() => userSchema.id),
  status: statusTypeEnum("status").default("Em andamento").notNull(),
});

export const taskRelations = relations(taskSchema, ({ one, many }) => ({
  user: one(userSchema, {
    fields: [taskSchema.userId],
    references: [userSchema.id],
    relationName: "task-user",
  }),
  assignUser: one(userSchema, {
    fields: [taskSchema.assignedId],
    references: [userSchema.id],
    relationName: "task-user",
  }),
  note: many(noteSchema),
}));
