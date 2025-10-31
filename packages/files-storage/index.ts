import * as Minio from "minio";
import { Buffer } from "node:buffer";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises";

export interface Bucket {
  getBucket(): string;

  /**
   * store file, return stored name
   * @param buf file content
   * @param mime file MIME: image/jpeg ....
   */
  store(buf: Buffer, mime: string): Promise<string>;
}

export class Image implements Bucket {
  private client: Minio.Client;

  constructor(
    endPoint: string,
    port: number,
    accessKey: string,
    secretKey: string,
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

    const file = await fs.readFile(buf);

    await this.client.putObject(
      this._bucket,
      name,
      file,
      file.length,
      metaData,
    );

    return name;
  }
}
