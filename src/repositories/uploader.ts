export interface UploaderParams {
  fileName: string;
  buffer: Buffer;
}

export interface Uploader {
  upload(params: UploaderParams): Promise<{
    path: string;
  } | null>;
}
