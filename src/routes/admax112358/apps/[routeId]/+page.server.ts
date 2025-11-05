import { redirect, type RequestEvent } from '@sveltejs/kit';
import { createApp, type CreationModel } from '$lib/server/repo/apps/create.ts';

export const actions = {
	create: async ({ request }: RequestEvent) => {
		const data = await request.formData();

		const creationModel = {};
		data.entries().forEach(([key, value]) => {
			Object.defineProperty(creationModel, key, {
				enumerable: true,
				configurable: false,
				writable: false,
				value
			});
		});

		await createApp(creationModel as CreationModel);

		redirect(301, '/admax112358/apps/10010');
	}
};
