import { redirect, type RequestEvent } from '@sveltejs/kit';
import {
	type AppRepo,
	appRepoServiceId,
	type CreationUpdateModel
} from '$lib/server/repo/apps/index.ts';

export async function load({ locals }: RequestEvent) {
	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
	const unusedRouteId = await appRepo.getUnusedRouteId();

	return {
		unusedRouteId
	};
}

export const actions = {
	create: async ({ request, locals }: RequestEvent) => {
		const data = await request.formData();

		const creationModel = {} as CreationUpdateModel;
		data.entries().forEach(([key, value]) => {
			Object.defineProperty(creationModel, key, {
				enumerable: true,
				configurable: false,
				writable: false,
				value
			});
		});

		const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
		await appRepo.createApp(creationModel);

		redirect(301, `/admax112358/apps/${creationModel.routeId}`);
	}
};
