import { error } from '@sveltejs/kit';
import { getAppByRouteId } from '$lib/server/repo/apps.ts';
import type { AppEntityTypeWithPrompt } from '$lib/share/index.ts';

const ROUTE_ID = 10003;

export async function load() {
	const app = (await getAppByRouteId(ROUTE_ID)) as AppEntityTypeWithPrompt;

	if (!app) {
		return error(404);
	}

	return {
		app,
		routeId: ROUTE_ID
	};
}
