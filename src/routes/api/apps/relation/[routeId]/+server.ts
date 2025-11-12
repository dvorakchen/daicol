import { json, type RequestEvent } from '@sveltejs/kit';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';

export async function GET({ params, locals, url }: RequestEvent) {
	const routeId = params.routeId ?? '';

	if (isNaN(parseInt(routeId))) {
		return json({}, { status: 422 });
	}

	const count = +(url.searchParams.get('count') ?? '8');
	locals.logger.info(`api/apps/relation/[routeId]: ${routeId}, count: ${count}`);

	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
	const apps = await appRepo.getRelationApps(+routeId, count);

	return json(apps);
}
