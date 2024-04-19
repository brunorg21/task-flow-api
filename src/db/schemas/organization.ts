import { createId } from "@paralleldrive/cuid2";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

export const organizationSchema = pgTable("organization", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name"),
  createdAt: timestamp("createdAt").defaultNow(),
});
