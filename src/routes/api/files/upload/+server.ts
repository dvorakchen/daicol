import { json, type RequestEvent } from '@sveltejs/kit';
import { Buffer } from 'node:buffer';
import { env } from '$env/dynamic/public';
import { type Bucket, bucketServiceId } from '$lib/server/file-store.ts';

export async function POST({ request, locals }: RequestEvent) {
	const file = (await request.formData()).get('file');
	if (!file || !(file instanceof File)) {
		return json({}, { status: 400 });
	}

	const buf = Buffer.from(await file.arrayBuffer());

	const bucket = locals.di.get<Bucket>(bucketServiceId);
	const storeName = await bucket.store(buf, file.type);

	const STATIC_SERVER_HOST = env.PUBLIC_STATIC_SERVER_HOST;
	const url = `${STATIC_SERVER_HOST}${bucket.getBucket()}/${storeName}`;

	return json({
		name: storeName,
		url
	});
}
