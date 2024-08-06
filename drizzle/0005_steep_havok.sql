ALTER TABLE "organization" ALTER COLUMN "slug" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "slug" DROP NOT NULL;