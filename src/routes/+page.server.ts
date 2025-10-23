import { getLatestApps, getRankApps, getRecommendApps } from '$lib/server/repo/apps.ts';
import { RankTypes } from '$lib/share/app.ts';

const HOME_PAGE_HOT_APPS_COUNT = 12;

export async function load() {
	const latestApps = await getLatestApps(HOME_PAGE_HOT_APPS_COUNT);
	const recommendApps = await getRecommendApps();
	const rankApps = await getRankApps(RankTypes.Total);

	return {
		latestApps,
		recommendApps,
		rankApps
	};
}
