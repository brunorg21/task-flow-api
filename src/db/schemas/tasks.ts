import { date, pgEnum, text, uuid } from "drizzle-orm/pg-core";
import { taskFlowschema } from ".";
import { relations } from "drizzle-orm";
import { userSchema } from "./users";

const statusTypeEnum = pgEnum("status", [
  "Em andamento",
  "Concluída",
  "Cancelada",
]);

export const taskSchema = taskFlowschema.table("tasks", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: date("createdAt").defaultNow(),
  userId: uuid("userId").notNull(),
  organizationId: uuid("organizationId"),
  assignedId: uuid("assignedId"),
  status: statusTypeEnum("status").default("Em andamento").notNull(),
  attachment: text("attachment"),
  noteId: uuid("noteId"),
});

export const taskRelations = relations(taskSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [taskSchema.userId],
    references: [userSchema.id],
  }),
}));
