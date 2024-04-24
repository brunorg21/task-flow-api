CREATE TABLE IF NOT EXISTS "attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text,
	"authorId" text,
	"fileName" text,
	"url" text,
	"text" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "attachmentId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attachments" ADD CONSTRAINT "attachments_taskId_tasks_id_fk" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attachments" ADD CONSTRAINT "attachments_authorId_note_id_fk" FOREIGN KEY ("authorId") REFERENCES "note"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
