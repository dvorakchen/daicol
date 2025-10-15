import { error, json, type RequestEvent } from '@sveltejs/kit';
import { AppCategories } from '$lib/share/app.ts';
import { getRankAppsByCategory } from '$lib/server/repo/apps.ts';
import logger from '$lib/server/log.ts';

export async function GET({ url }: RequestEvent) {
	const category = (url.searchParams.get('category') ?? '').trim().toLowerCase();

	logger.info(`API handle get same category ranking: ${category}`);
	if (!category) {
		return error(400);
	}

	if (!Object.values(AppCategories).includes(category as AppCategories)) {
		return error(400);
	}

	const apps = await getRankAppsByCategory(category as AppCategories);

	return json(apps);
}
