import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import {
	type AppRepo,
	appRepoServiceId,
	type CreationUpdateModel
} from '$lib/server/repo/apps/index.ts';
import { isAdmin } from '$lib/server/auth.ts';
import { JWT_COOKIE_KEY } from '$lib/server/jwt.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

export async function load({ locals }: RequestEvent) {
	const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
	const unusedRouteId = await appRepo.getUnusedRouteId();

	return {
		unusedRouteId
	};
}

export const actions = {
	create: async ({ cookies, request, locals }: RequestEvent) => {
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
