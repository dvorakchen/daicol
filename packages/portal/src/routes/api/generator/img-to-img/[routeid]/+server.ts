import logger from '$lib/server/log.ts';
import { json, type RequestEvent } from '@sveltejs/kit';
import { callGenerate as generateImgToImg } from '$lib/server/generator/img-to-img.ts';
import { getPrompt, getReferenceImgs, increaseUsedCount } from '$lib/server/repo/apps.ts';
import { UPLOAD_IMAGE_MAX_SIZE } from '$lib/share/index.ts';
import type { ReferenceImage } from '$lib/server/generator/index.ts';

export async function POST({ request, params }: RequestEvent) {
	const routeId = params['routeid'];
	if (!routeId) {
		return new Response(null, { status: 400 });
	}

	logger.info(`api generate 1-img-to-1-img, routeId: ${routeId}`);
	const formData = await request.formData();
	logger.info(formData);
	const files = formData.getAll('file') as File[] | null;
	logger.info(`files: ${files?.length}`);

	if (
		isNaN(parseInt(routeId)) ||
		files === null ||
		files?.some((file) => file === null || file.size > UPLOAD_IMAGE_MAX_SIZE)
	) {
		return new Response(null, { status: 400 });
	}

	const referFilesData: ReferenceImage[] = [];

	for (const file of files) {
		logger.info(`filetype: ${file.type}`);
		referFilesData.push({
			mimeType: file.type,
			content: await file.arrayBuffer()
		} as ReferenceImage);
	}

	const referImgs = (await getReferenceImgs(+routeId)).map(
		(img) =>
			({
				mimeType: img.mimeType,
				content: img.content!.buffer
			}) as ReferenceImage
	);

	referFilesData.push(...referImgs);

	logger.info(`all reference images: ${referFilesData.length}`);

	const prompt = await getPrompt(+routeId);
	const urls = await generateImgToImg(referFilesData, prompt);

	await increaseUsedCount(+routeId);

	return json({ urls });
}
