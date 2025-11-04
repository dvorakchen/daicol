import type { App } from '$lib/server/db/schema/index.ts';
import { db } from '$lib/server/db/index.ts';
import { apps } from '$lib/server/db/schema/apps.ts';
import { eq } from 'drizzle-orm';
import { AppStatus } from '$lib/share/app.ts';
import fileStore from '$lib/server/file-store.ts';
import { Buffer } from 'node:buffer';
import logger from '$lib/server/log.ts';
import { resizeAndCompress } from '$lib/server/image-helper/index.ts';
import { env } from '$env/dynamic/public';

export type CreationModel = Omit<
	App,
	'id' | 'createAt' | 'updateAt' | 'status' | 'referenceImgs' | 'tags' | 'seoKeywords'
> & {
	referenceImgs: string;
	seoKeywords: string;
	tags: string;
};

export async function createApp(model: CreationModel) {
	logger.info(`Create app`);

	let exists = (await db.$count(apps, eq(apps.routeId, model.routeId))) > 0;

	if (exists) {
		throw `App routeId exists: ${model.routeId}`;
	}
	logger.info(`RouteId ${model.routeId} not exists`);

	exists = (await db.$count(apps, eq(apps.name, model.name))) > 0;
	if (exists) {
		throw `App name exists: ${model.routeId}`;
	}
	logger.info(`RouteId ${model.routeId} not exists`);

	const STATIC_SERVER_HOST = env.PUBLIC_STATIC_SERVER_HOST;

	const referenceImgBuffers = await refImgs2BytesAndCompress(JSON.parse(model.referenceImgs));

	const insertionModel = {
		routeId: model.routeId,
		name: model.name,
		category: model.category,
		tags: JSON.parse(model.tags),
		description: model.description,
		seoKeywords: JSON.parse(model.seoKeywords),
		seoDescription: model.seoDescription,
		model: model.model,
		source: model.source,
		prompt: model.prompt,
		rate: model.rate,
		points: model.points,

		referenceImgs: referenceImgBuffers,
		originImg: `${STATIC_SERVER_HOST}${fileStore.getBucket()}/${model.originImg}`,
		handledImg: `${STATIC_SERVER_HOST}${fileStore.getBucket()}/${model.handledImg}`,
		icon: `${STATIC_SERVER_HOST}${fileStore.getBucket()}/${model.icon}`,
		barImg: `${STATIC_SERVER_HOST}${fileStore.getBucket()}/${model.barImg}`,
		promptPlugIn: JSON.parse(model.promptPlugIn as string),
		status: AppStatus.Enabled
	} as App;

	await db.insert(apps).values({
		...insertionModel
	});
}

async function refImgs2BytesAndCompress(refImgs: string[]): Promise<Buffer[]> {
	const bufs: Buffer[] = [];

	for (const filename of refImgs) {
		logger.info(`Get image buffer: ${filename}`);
		let buf = await fileStore.getFile(filename);
		if (!buf) {
			continue;
		}

		logger.info(`Before compress: ${buf.length} bytes`);
		buf = await resizeAndCompress(buf);
		logger.info(`After compress: ${buf.length} bytes`);

		bufs.push(buf);

		await fileStore.remove(filename);
	}

	return bufs;
}
