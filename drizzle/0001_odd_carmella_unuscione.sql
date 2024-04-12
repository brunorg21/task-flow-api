CREATE TABLE IF NOT EXISTS "organization" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"createdAt" date DEFAULT now()
);
