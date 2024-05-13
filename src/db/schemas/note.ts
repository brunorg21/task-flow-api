import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { taskSchema } from "./tasks";
import { userSchema } from "./users";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const noteSchema = pgTable("note", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  taskId: text("taskId")
    .references(() => taskSchema.id)
    .notNull(),
  authorId: text("authorId")
    .references(() => userSchema.id)
    .notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
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
    relationName: "note-task  ",
  }),
}));
