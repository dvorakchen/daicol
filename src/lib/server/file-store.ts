import { env } from '$env/dynamic/private';
import * as Minio from 'minio';
import { Buffer } from 'node:buffer';
import { v4 as uuidv4 } from 'uuid';
import { getFilename } from '$lib/share/files.ts';
import { inject, injectable, type ServiceIdentifier } from 'inversify';
import { type Logger, loggerServiceId } from '$lib/server/logger/index.ts';

export interface Bucket {
	getBucket(): string;

	/**
	 * store file, return stored name
	 * @param buf file content
	 * @param mime file MIME: image/jpeg ....
	 */
	store(buf: Buffer, mime: string): Promise<string>;

	remove(filename: string): Promise<void>;
	removeAll(filenames: string[]): Promise<void>;
	getFile(name: string): Promise<Buffer<ArrayBufferLike> | null>;
	hostname(): string;
}

export const bucketServiceId: ServiceIdentifier<Bucket> = Symbol.for('bucketServiceId');

const MINIO_ENDPOINT = env.MINIO_ENDPOINT;
const MINIO_PORT = env.MINIO_PORT;
const MINIO_ACCESS_KEY = env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = env.MINIO_SECRET_KEY;

@injectable()
export class Image implements Bucket {
	private client: Minio.Client;
	private readonly useSSL: boolean;
	private readonly endPoint: string;
	private readonly port: number;

	constructor(@inject(loggerServiceId) private logger: Logger) {
		this.useSSL = false;
		this.endPoint = MINIO_ENDPOINT;
		this.port = +MINIO_PORT;

		this.client = new Minio.Client({
			endPoint: this.endPoint,
			port: this.port,
			useSSL: false,
			accessKey: MINIO_ACCESS_KEY,
			secretKey: MINIO_SECRET_KEY
		});

		this.logger.info(`MINIO_ENDPOINT: ${MINIO_ENDPOINT}`);
		this.logger.info(`MINIO_PORT: ${MINIO_PORT}`);
		this.logger.info(`MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY}`);
		this.logger.info(`MINIO_SECRET_KEY: ${MINIO_SECRET_KEY}`);
	}
	remove(filename: string): Promise<void> {
		return this.client.removeObject(this._bucket, filename);
	}

	async removeAll(filenames: string[]): Promise<void> {
		for (const img of filenames) {
			const name = getFilename(img);
			await this.remove(name);
		}
	}

	private _bucket = 'images';
	getBucket(): string {
		return this._bucket;
	}

	hostname(): string {
		const protocol = this.useSSL ? 'https' : 'http';
		return `${protocol}://${this.endPoint}:${this.port}/`;
	}

	/**
	 * store file into Minio and return the unique file name
	 * @param buf file content
	 * @param mime MINE of file
	 * @returns stored file name
	 */
	async store(buf: Buffer, mime: string): Promise<string> {
		const ext = mime.split('/').at(-1);
		const name = `${uuidv4()}.${ext}`;

		const exists = await this.client.bucketExists(this._bucket);
		if (!exists) {
			await this.client.makeBucket(this._bucket);
			const policy = JSON.stringify({
				Version: '2012-10-17',
				Statement: [
					{
						Sid: 'PublicRead',
						Effect: 'Allow',
						Principal: {
							AWS: ['*']
						},
						Action: ['s3:GetObject'],
						Resource: [`arn:aws:s3:::${this._bucket}/*`]
					}
				]
			});

			await this.client.setBucketPolicy(this._bucket, policy);
		}

		const metaData = {
			'Content-Type': mime
		};

		await this.client.putObject(this._bucket, name, buf, buf.length, metaData);

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
