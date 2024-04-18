import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { taskSchema } from "./tasks";
import { userSchema } from "./users";
import { relations } from "drizzle-orm";

export const noteSchema = pgTable("note", {
  id: uuid("id").primaryKey(),
  taskId: uuid("taskId")
    .references(() => taskSchema.id, { onDelete: "set null" })
    .notNull(),
  authorId: uuid("authorId")
    .references(() => userSchema.id, { onDelete: "set null" })
    .notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAat").$onUpdate(() => new Date()),
});

export const noteRelations = relations(noteSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [noteSchema.authorId],
    references: [userSchema.id],
    relationName: "note-user",
  }),
  task: one(taskSchema, {
    fields: [noteSchema.taskId],
    references: [taskSchema.id],
    relationName: "note-task",
  }),
}));
