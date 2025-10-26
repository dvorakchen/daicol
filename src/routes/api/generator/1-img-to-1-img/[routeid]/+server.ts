import logger from '$lib/server/log.ts';
import { json, type RequestEvent } from '@sveltejs/kit';
import { callGenerate as generate1ImgTo1Img } from '$lib/server/generator/1-img-to-1-img.ts';
import { getPrompt, increaseUsedCount } from '$lib/server/repo/apps.ts';
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
	const file = formData.get('file0') as File | null;
	logger.info(`file: ${file?.name}`);

	if (file === null || file.size > UPLOAD_IMAGE_MAX_SIZE || isNaN(parseInt(routeId))) {
		return new Response(null, { status: 400 });
	}

	const referFilesData = [
		{
			filename: file.name,
			content: await file.arrayBuffer()
		} as ReferenceImage
	];

	logger.info(`all reference images: ${referFilesData.length}`);

	const prompt = await getPrompt(+routeId);
	const url = await generate1ImgTo1Img(referFilesData, prompt);

	await increaseUsedCount(+routeId);

	return json({ url });
}
