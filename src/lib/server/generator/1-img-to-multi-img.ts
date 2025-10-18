import logger from '$lib/server/log.ts';
import { generate as douBaoApi } from '$lib/server/generator/api-doubao.ts';

export async function callGenerate(
	file: File,
	prompt: string,
	maxImages: number = 4
): Promise<string[]> {
	logger.info(`generate 1-img-to-multi-img`);

	return await douBaoApi([file], prompt, maxImages);
}
