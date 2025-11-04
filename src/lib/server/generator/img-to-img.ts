import { generate as douBaoApi } from '$lib/server/generator/api-doubao.ts';
import type { ReferenceImage } from '$lib/server/generator/index.ts';

export async function callGenerate(images: ReferenceImage[], prompt: string): Promise<string[]> {
	return await douBaoApi(images, prompt, 1);
}
