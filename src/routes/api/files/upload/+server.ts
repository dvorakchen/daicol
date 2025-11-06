import storeBucket from '$lib/server/file-store.ts';
import { json, type RequestEvent } from '@sveltejs/kit';
import { Buffer } from 'node:buffer';
import { env } from '$env/dynamic/public';

export async function POST({ request }: RequestEvent) {
	const file = (await request.formData()).get('file');
	if (!file || !(file instanceof File)) {
		return json({}, { status: 400 });
	}

	const buf = Buffer.from(await file.arrayBuffer());

	const storeName = await storeBucket.store(buf, file.type);

	const STATIC_SERVER_HOST = env.PUBLIC_STATIC_SERVER_HOST;
	const url = `${STATIC_SERVER_HOST}${storeBucket.getBucket()}/${storeName}`;

	return json({
		name: storeName,
		url
	});
}
