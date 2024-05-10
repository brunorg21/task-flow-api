import { supabaseClient } from "@/db/supabase/client";
import { Uploader, UploaderParams } from "../uploader";

export class UploadAttachmentRepository implements Uploader {
  async upload({
    buffer,
    fileName,
  }: UploaderParams): Promise<{ path: string } | null> {
    const { data } = await supabaseClient.storage
      .from("attachments")
      .upload(fileName, buffer);

    return data;
  }
}
