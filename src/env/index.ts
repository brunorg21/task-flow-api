import { z } from "zod";

const envSchmea = z.object({
  NODE_ENV: z.enum(["dev", "production"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
});

const _env = envSchmea.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
