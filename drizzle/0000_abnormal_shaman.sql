CREATE SCHEMA "task-flow";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task-flow"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
