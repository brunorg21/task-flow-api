import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { taskSchema } from "./tasks";
import { noteSchema } from "./note";
import { relations } from "drizzle-orm";

export const attachmentSchema = pgTable("attachments", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  taskId: text("taskId").references(() => taskSchema.id),
  noteId: text("noteId").references(() => noteSchema.id),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  type: text("text").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const attachmentRelations = relations(attachmentSchema, ({ one }) => ({
  note: one(noteSchema, {
    fields: [attachmentSchema.noteId],
    references: [noteSchema.id],
    relationName: "note-attachment",
  }),
  task: one(taskSchema, {
    fields: [attachmentSchema.taskId],
    references: [taskSchema.id],
    relationName: "task-attachment",
  }),
}));
