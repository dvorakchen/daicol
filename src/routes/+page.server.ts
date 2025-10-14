import { getHotApps, getRankApps } from '$lib/server/repo/apps.ts';
import { RankTypes } from '$lib/share/app.ts';

const HOME_PAGE_HOT_APPS_COUNT = 10;

export async function load() {
	const hotApps = await getHotApps(HOME_PAGE_HOT_APPS_COUNT);

	const rankApps = await getRankApps(RankTypes.Total);

	return {
		hotApps,
		rankApps
	};
}
