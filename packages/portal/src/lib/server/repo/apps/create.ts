import type { App } from '$lib/server/db/schema/index.ts';
import { db } from '$lib/server/db/index.ts';
import { apps } from '$lib/server/db/schema/apps.ts';
import { eq } from 'drizzle-orm';
import { AppStatus } from '$lib/share/app.ts';
import fileStore from '$lib/server/file-store.ts';
import { Buffer } from 'node:buffer';
import logger from '$lib/server/log.ts';
import { resizeAndCompressToWebp } from '@daicol/image-helper';

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
	console.log(model);

	const exists = (await db.$count(apps, eq(apps.routeId, model.routeId))) > 0;

	logger.info(`RouteId ${model.routeId} not exists`);
	if (exists) {
		throw `App routeId exists: ${model.routeId}`;
	}

	const hostname = fileStore.hostname();

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
		originImg: `${hostname}${fileStore.getBucket()}/${model.originImg}`,
		handledImg: `${hostname}${fileStore.getBucket()}/${model.handledImg}`,
		icon: `${hostname}${fileStore.getBucket()}/${model.icon}`,
		barImg: `${hostname}${fileStore.getBucket()}/${model.barImg}`,
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
		buf = await resizeAndCompressToWebp(buf);
		logger.info(`After compress: ${buf.length} bytes`);

		bufs.push(buf);

		await fileStore.remove(filename);
	}

	return bufs;
}
