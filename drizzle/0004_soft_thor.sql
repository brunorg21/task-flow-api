CREATE TABLE IF NOT EXISTS "note" (
	"id" uuid PRIMARY KEY NOT NULL,
	"taskId" uuid NOT NULL,
	"authorId" uuid NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAat" timestamp
);
--> statement-breakpoint
ALTER TABLE "user-organization" RENAME TO "userOrganization";--> statement-breakpoint
ALTER TABLE "userOrganization" DROP CONSTRAINT "user-organization_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "userOrganization" DROP CONSTRAINT "user-organization_organizationId_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userOrganization" ADD CONSTRAINT "userOrganization_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userOrganization" ADD CONSTRAINT "userOrganization_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "noteId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_taskId_tasks_id_fk" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
