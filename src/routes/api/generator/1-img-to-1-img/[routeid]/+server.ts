import logger from '$lib/server/log.ts';
import { json, type RequestEvent } from '@sveltejs/kit';
import { generate as generate1ImgTo1Img } from '$lib/server/generator/1-img-to-1-img.ts';
import { getPrompt } from '$lib/server/repo/apps';

export async function POST({ request, params }: RequestEvent) {
	const routeId = params['routeid'];
	if (!routeId) {
		return new Response(null, { status: 400 });
	}

	logger.info(`api generate 1-img-to-1-img, routeId: ${routeId}`);
	const formData = await request.formData();
	logger.info(formData);
	const file = formData.get('file0') as File | null;
	logger.info(`file: ${file}`);
	if (file === null || isNaN(parseInt(routeId))) {
		return new Response(null, { status: 400 });
	}

	const prompt = await getPrompt(+routeId);
	const url = await generate1ImgTo1Img(file, prompt);

	return json({ url });
}
