ALTER TABLE "attachments" RENAME COLUMN "authorId" TO "noteId";--> statement-breakpoint
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_authorId_note_id_fk";
--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "fileName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "text" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attachments" ADD CONSTRAINT "attachments_noteId_note_id_fk" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
