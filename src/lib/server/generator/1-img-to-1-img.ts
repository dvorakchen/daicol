import logger from '$lib/server/log.ts';
import { generate as douBaoApi } from '$lib/server/generator/api-doubao.ts';
import type { ReferenceImage } from '$lib/server/generator/index.ts';

export async function callGenerate(images: ReferenceImage[], prompt: string): Promise<string> {
	logger.info(`generate 1-img-to-1-img`);

	return (await douBaoApi(images, prompt, 1))[0];
}
