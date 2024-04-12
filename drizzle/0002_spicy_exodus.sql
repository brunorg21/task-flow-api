CREATE TABLE IF NOT EXISTS "user-organization" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"organizationId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user-organization" ADD CONSTRAINT "user-organization_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user-organization" ADD CONSTRAINT "user-organization_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
