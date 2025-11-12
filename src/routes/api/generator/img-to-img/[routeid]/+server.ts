import { json, type RequestEvent } from '@sveltejs/kit';
import { UPLOAD_IMAGE_MAX_SIZE } from '$lib/share/index.ts';
import {
	type Generator,
	generatorServiceId,
	type ReferenceImage
} from '$lib/server/generator/index.ts';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';

export async function POST({ request, params, locals }: RequestEvent) {
	const routeId = params['routeid'];
	if (!routeId) {
		return new Response(null, { status: 400 });
	}

	locals.logger.info(`api generate 1-img-to-1-img, routeId: ${routeId}`);
	const formData = await request.formData();
	locals.logger.info(JSON.stringify(formData));
	const files = formData.getAll('file') as File[] | null;
	locals.logger.info(`files: ${files?.length}`);

	if (
		isNaN(parseInt(routeId)) ||
		files === null ||
		files?.some((file) => file === null || file.size > UPLOAD_IMAGE_MAX_SIZE)
	) {
		return new Response(null, { status: 400 });
	}

	const referFilesData: ReferenceImage[] = [];

	for (const file of files) {
		locals.logger.info(`filetype: ${file.type}`);
		referFilesData.push({
			mimeType: file.type,
			content: await file.arrayBuffer()
		} as ReferenceImage);
	}

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

	const prompt = await appRepo.getPrompt(+routeId);

	const generator = locals.di.get<Generator>(generatorServiceId);
	const urls = await generator.genImage(referFilesData, prompt);

	await appRepo.increaseUsedCount(+routeId);

	return json({ urls });
}
