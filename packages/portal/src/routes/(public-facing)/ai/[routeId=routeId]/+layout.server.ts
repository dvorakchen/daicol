import { error, type RequestEvent } from '@sveltejs/kit';
import { getAppByRouteId } from '$lib/server/repo/apps.ts';
import logger from '$lib/server/log.ts';
import type { AppWithoutPrompt } from '$lib/server/db/schema/index.ts';

export async function load({ params }: RequestEvent) {
	const routeId = +(params.routeId ?? '');
	logger.warn(`routeId: ${routeId}`);

	const app = (await getAppByRouteId(routeId)) as AppWithoutPrompt;

	if (!app) {
		return error(404);
	}

	return {
		app,
		routeId: routeId
	};
}
