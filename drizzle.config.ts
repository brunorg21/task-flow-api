import { env } from "@/env";

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
