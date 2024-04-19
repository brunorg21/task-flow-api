ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "organizationId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "assignedId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userOrganization" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userOrganization" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userOrganization" ALTER COLUMN "organizationId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "taskId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "authorId" SET DATA TYPE text;