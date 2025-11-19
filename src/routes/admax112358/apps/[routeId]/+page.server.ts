import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import {
	type AppRepo,
	appRepoServiceId,
	type CreationUpdateModel
} from '$lib/server/repo/apps/index.ts';
import { isAdmin } from '$lib/server/auth.ts';
import { JWT_COOKIE_KEY } from '$lib/server/jwt.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

export const actions = {
	update: async ({ cookies, request, locals }: RequestEvent) => {
		if (
			!isAdmin(
				cookies.get(JWT_COOKIE_KEY) ?? '',
				locals.privateEnv.JWT_KEY,
				locals.di.get<UserRepo>(userRepoServiceId)
			)
		) {
			return fail(401);
		}
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
