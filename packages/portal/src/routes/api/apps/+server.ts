import { type RequestEvent, json } from '@sveltejs/kit';
import { getAppsFromFilter } from '$lib/server/repo/apps/apps.ts';

export async function GET({ url }: RequestEvent) {
	const name = url.searchParams.get('name') ?? undefined;
	const routeId = url.searchParams.get('routeId') ?? '';
	const page = +(url.searchParams.get('page') ?? '1');
	const size = +(url.searchParams.get('size') ?? '20');

	let routeIdParam: number | undefined;
	if (isNaN(parseInt(routeId))) {
		routeIdParam = undefined;
	} else {
		routeIdParam = parseInt(routeId);
	}

	const offset = (page - 1) * size;

	const list = await getAppsFromFilter({
		name,
		routeId: routeIdParam,
		size,
		offset
	});

	return json(list);
}
