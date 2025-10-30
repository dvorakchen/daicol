import { type RequestEvent, redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		console.log(data);

		redirect(301, '/admax112358/apps/10010')
	}
};
