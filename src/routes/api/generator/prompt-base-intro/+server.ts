import {
	promptBaseIntroGeneratorServiceId,
	type PromptBaseIntroGenerator
} from '$lib/server/generator/index.ts';
import { fail, type RequestEvent, json } from '@sveltejs/kit';

export async function GET({ request, locals }: RequestEvent) {
	const generator = locals.di.get<PromptBaseIntroGenerator>(promptBaseIntroGeneratorServiceId);

	const { prompt } = await request.json();

	if (!prompt) {
		return fail(400);
	}

	const res = await generator.genInfoByPrompt(prompt);

	return json(res);
}
