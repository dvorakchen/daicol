import type { RequestEvent } from '@sveltejs/kit';
import { QS_SEARCH_KEY, QS_SEARCH_TYPE_KEY, SearchType } from '$lib/share/index.ts';
import logger from '$lib/server/log.ts';
import { searchApps } from '$lib/server/repo/apps.ts';

export async function load({ url }: RequestEvent) {
	const sp = url.searchParams;
	const search = (sp.get(QS_SEARCH_KEY) ?? '').trim().toLowerCase();
	const typeQS = (sp.get(QS_SEARCH_TYPE_KEY) ?? '').trim().toLowerCase();

	let searcType: SearchType;
	if (Object.values(SearchType).includes(typeQS as SearchType)) {
		searcType = typeQS as SearchType;
	} else {
		searcType = SearchType.None;
	}

	logger.info(`search: ${search}, type: ${searcType}`);
	await searchApps(search, searcType);

	return {
		search,
		searcType
	};
}
