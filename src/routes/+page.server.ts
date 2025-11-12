import { RankTypes } from '$lib/share/app.ts';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';
import type { RequestEvent } from '@sveltejs/kit';

const HOME_PAGE_HOT_APPS_COUNT = 12;
const HOME_PAGE_RECOMMEND_APPS_COUNT = 10;

export async function load({ locals }: RequestEvent) {
	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);

	const latestApps = await appRepo.getLatestApps(HOME_PAGE_HOT_APPS_COUNT);
	const recommendApps = await appRepo.getRecommendApps(HOME_PAGE_RECOMMEND_APPS_COUNT);
	const rankApps = await appRepo.getRankApps(RankTypes.Total);

	return {
		latestApps,
		recommendApps,
		rankApps
	};
}
