import * as Minio from "minio";
import { Buffer } from "node:buffer";
import { v4 as uuidv4 } from 'uuid';

export interface Bucket {
  getBucket(): string;

  /**
   * store file, return stored name
   * @param buf file content
   * @param mime file MIME: image/jpeg ....
   */
  store(buf: Buffer, mime: string): string;
}

export class Image implements Bucket {
  private client: Minio.Client;

  constructor(
    private endPoint: string,
    private port: number,
    private accessKey: string,
    private secretKey: string,
  ) {
    this.client = new Minio.Client({
      endPoint,
      port,
      useSSL: true,
      accessKey,
      secretKey,
    });
  }

  private _bucket = "images";
  getBucket(): string {
    return this._bucket;
  }

  store(buf: Buffer, mime: string): string {
    const ext = mime.split('/').at(-1);
    const name = `${uuidv4()}.${ext}`;

    

    return name;
  }
}
