import { error, type RequestEvent } from '@sveltejs/kit';
import type { AppWithoutPrompt } from '$lib/server/db/schema.ts';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';

export async function load({ params, locals }: RequestEvent) {
	const routeId = +(params.routeId ?? '');
	locals.logger.warn(`routeId: ${routeId}`);

	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
	const app = (await appRepo.getAppByRouteId(routeId, true)) as AppWithoutPrompt;

	if (!app) {
		return error(404);
	}

	return {
		app,
		routeId: routeId
	};
}
