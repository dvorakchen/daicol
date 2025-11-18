import { json, type RequestEvent } from '@sveltejs/kit';
import { getAppsFromFilter } from '$lib/server/repo/apps/apps.ts';
import { type PaginationList } from '$lib/share/index.ts';
import type { AppWithoutPrompt } from '$lib/server/db/schema/index.ts';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';
import { type Bucket, bucketServiceId } from '$lib/server/file-store.ts';

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

	const listAndTotal = await getAppsFromFilter({
		name,
		routeId: routeIdParam,
		size,
		offset
	});

	return json({
		list: listAndTotal.list,
		total: listAndTotal.total
	} as PaginationList<AppWithoutPrompt>);
}

export async function DELETE({ url, locals }: RequestEvent) {
	const routeId = url.searchParams.get('routeId') ?? '';

	if (isNaN(parseInt(routeId))) {
		return json({}, { status: 400 });
	}

	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
	const app = await appRepo.removeApp(+routeId);

	if (app) {
		const bucket = locals.di.get<Bucket>(bucketServiceId);
		if (app.referenceImgs?.length) {
			bucket.removeAll(app.referenceImgs);
		}

		if (app.originImg) {
			bucket.remove(app.originImg);
		}
		if (app.handledImg) {
			bucket.remove(app.handledImg);
		}
		if (app.icon) {
			bucket.remove(app.icon);
		}
		if (app.barImg) {
			bucket.remove(app.barImg);
		}
	}

	return json({});
}
