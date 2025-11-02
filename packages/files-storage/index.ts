import * as Minio from "minio";
import { Buffer } from "node:buffer";
import { v4 as uuidv4 } from "uuid";

export interface Bucket {
  getBucket(): string;

  /**
   * store file, return stored name
   * @param buf file content
   * @param mime file MIME: image/jpeg ....
   */
  store(buf: Buffer, mime: string): Promise<string>;

  remove(filename: string): Promise<void>;
getFile(name: string): Promise<Buffer<ArrayBufferLike> | null>;
  hostname(): string;
}

export class Image implements Bucket {
  private client: Minio.Client;

  constructor(
    private endPoint: string,
    private port: number,
    accessKey: string,
    secretKey: string,
    private useSSL: boolean = false,
  ) {
    this.client = new Minio.Client({
      endPoint,
      port,
      useSSL,
      accessKey,
      secretKey,
    });
  }
  remove(filename: string): Promise<void> {
    return this.client.removeObject(this._bucket, filename);
  }

  private _bucket = "images";
  getBucket(): string {
    return this._bucket;
  }

  hostname(): string {
    const protocol = this.useSSL ? "https" : "http";
    return `${protocol}://${this.endPoint}:${this.port}/`;
  }

  /**
   * store file into Minio and return the unique file name
   * @param buf file content
   * @param mime MINE of file
   * @returns stored file name
   */
  async store(buf: Buffer, mime: string): Promise<string> {
    const ext = mime.split("/").at(-1);
    const name = `${uuidv4()}.${ext}`;

    const exists = await this.client.bucketExists(this._bucket);
    if (!exists) {
      await this.client.makeBucket(this._bucket);
      const policy = JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "PublicRead",
            Effect: "Allow",
            Principal: {
              AWS: ["*"],
            },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${this._bucket}/*`],
          },
        ],
      });

      await this.client.setBucketPolicy(this._bucket, policy);
    }

    const metaData = {
      "Content-Type": "image/jpeg",
    };

    await this.client.putObject(
      this._bucket,
      name,
      buf,
      buf.length,
      metaData,
    );

    return name;
  }

  async getFile(name: string): Promise<Buffer<ArrayBufferLike> | null> {
    const stream = await this.client.getObject(this._bucket, name);
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }
}
