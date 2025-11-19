import { json, type RequestEvent } from '@sveltejs/kit';
import {
	blendPlugInPrompt,
	getFileMIME,
	getFilename,
	UPLOAD_IMAGE_MAX_SIZE
} from '$lib/share/index.ts';
import {
	type Generator,
	generatorServiceId,
	type ReferenceImage
} from '$lib/server/generator/index.ts';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';
import type { Logger } from '$lib/server/logger/index.ts';
import { bucketServiceId, type Bucket } from '$lib/server/file-store.ts';

const FILE_KEY_IN_FORMDATA = 'file';

export async function POST({ request, params, locals }: RequestEvent) {
	const routeId = params['routeid'];
	if (!routeId) {
		return new Response(null, { status: 400 });
	}

	locals.logger.info(`api generate 1-img-to-1-img, routeId: ${routeId}`);
	const formData = await request.formData();

	const promptPlugIn: Record<string, string> = {};
	formData.entries().forEach(([key, value]) => {
		if (key === FILE_KEY_IN_FORMDATA) {
			return;
		}
		promptPlugIn[key] = value.toString();
	});
	locals.logger.info(JSON.stringify(promptPlugIn));

	const files = formData.getAll(FILE_KEY_IN_FORMDATA) as File[] | null;
	locals.logger.info(`files: ${files?.length}`);

	if (
		isNaN(parseInt(routeId)) ||
		files === null ||
		files?.some((file) => file === null || file.size > UPLOAD_IMAGE_MAX_SIZE)
	) {
		return new Response(null, { status: 400 });
	}

	const referFilesData: ReferenceImage[] = [];

	referFilesData.push(...(await files2ReferenceImage(files, locals.logger)));

	// const referImgs = (await getReferenceImgs(+routeId)).map(
	// 	(img) =>
	// 		({
	// 			mimeType: img.mimeType,
	// 			content: img.content!.buffer
	// 		}) as ReferenceImage
	// );

	// referFilesData.push(...referImgs);

	locals.logger.info(`all reference images: ${referFilesData.length}`);
	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);

	const app = await appRepo.getAppByRouteId(+routeId, false);
	if (!app) {
		return new Response(null, { status: 422 });
	}

	if ((app.referenceImgs?.length ?? 0) > 0) {
		const bucket = locals.di.get<Bucket>(bucketServiceId);
		referFilesData.push(...(await fileUrls2ReferenceImage(app.referenceImgs!, bucket)));
	}

	let prompt = app.prompt;
	locals.logger.info(prompt);

	prompt = blendPlugInPrompt(prompt, promptPlugIn);
	locals.logger.info('after blended');
	locals.logger.info(prompt);

	const generator = locals.di.get<Generator>(generatorServiceId);
	const urls = await generator.genImage(referFilesData, prompt);

	await appRepo.increaseUsedCount(+routeId);

	return json({ urls });
}

async function files2ReferenceImage(files: File[], logger: Logger): Promise<ReferenceImage[]> {
	const list = [];
	for (const file of files) {
		logger.info(`filetype: ${file.type}`);
		list.push({
			mimeType: file.type,
			content: await file.arrayBuffer()
		} as ReferenceImage);
	}

	return list;
}

async function fileUrls2ReferenceImage(urls: string[], bucket: Bucket): Promise<ReferenceImage[]> {
	const list: ReferenceImage[] = [];

	for (const url of urls) {
		const filename = getFilename(url);
		const buf = await bucket.getFile(filename);
		if (!buf) {
			continue;
		}

		list.push({
			mimeType: getFileMIME(filename),
			content: buf.buffer
		} as ReferenceImage);
	}

	return list;
}
