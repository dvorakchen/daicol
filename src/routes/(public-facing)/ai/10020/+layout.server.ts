import { error } from '@sveltejs/kit';
import { getAppByRouteId } from '$lib/server/repo/apps.ts';
import type { AppEntityTypeWithoutPrompt } from '$lib/share/index.ts';

const ROUTE_ID = 10020;

export async function load() {
	const app = (await getAppByRouteId(ROUTE_ID)) as AppEntityTypeWithoutPrompt;

	if (!app) {
		return error(404);
	}

	return {
		app,
		routeId: ROUTE_ID
	};
}
