import { randomUUID } from "crypto";
import { Uploader, UploaderParams } from "../uploader";

export interface Upload {
  fileName: string;
  path: string;
}

export class InMemoryUploader implements Uploader {
  public uploads: Upload[] = [];

  async upload({ fileName }: UploaderParams): Promise<{ path: string } | null> {
    const path = randomUUID();

    this.uploads.push({
      fileName,
      path,
    });

    return { path };
  }
}
