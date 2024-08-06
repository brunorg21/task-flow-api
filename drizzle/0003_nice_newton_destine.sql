CREATE TABLE IF NOT EXISTS "invite" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"recipientId" text NOT NULL,
	"senderId" text NOT NULL,
	"invitationAccepted" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "ownerId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization" ADD CONSTRAINT "organization_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invite" ADD CONSTRAINT "invite_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invite" ADD CONSTRAINT "invite_recipientId_users_id_fk" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invite" ADD CONSTRAINT "invite_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_slug_unique" UNIQUE("slug");