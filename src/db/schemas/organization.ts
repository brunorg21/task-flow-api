import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const organizationSchema = pgTable("organization", {
  id: uuid("id").primaryKey(),
  name: text("name"),
  createdAt: date("createdAt").defaultNow(),
});