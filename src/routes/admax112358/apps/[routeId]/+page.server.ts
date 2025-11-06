import { redirect, type RequestEvent } from '@sveltejs/kit';
import { updateApp, type CreationUpdateModel } from '$lib/server/repo/apps/create.ts';

export const actions = {
	update: async ({ request }: RequestEvent) => {
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

		await updateApp(updateModel);

		redirect(301, `/admax112358/apps/${updateModel.routeId}`);
	}
};
