import { redirect, type RequestEvent } from '@sveltejs/kit';
import {
	type AppRepo,
	appRepoServiceId,
	type CreationUpdateModel
} from '$lib/server/repo/apps/index.ts';

export const actions = {
	update: async ({ request, locals }: RequestEvent) => {
		const data = await request.formData();

		const updateModel = {} as CreationUpdateModel;
		data.entries().forEach(([key, value]) => {
			Object.defineProperty(updateModel, key, {
				enumerable: true,
				configurable: false,
				writable: false,
				value
			});
		});

		const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
		await appRepo.updateApp(updateModel);

		redirect(301, `/admax112358/apps/${updateModel.routeId}`);
	}
};
