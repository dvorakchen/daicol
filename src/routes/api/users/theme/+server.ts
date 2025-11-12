import { json, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

export async function POST({ request, cookies, locals }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies, locals.privateEnv.JWT_KEY);
	if (!sub) {
		return json({});
	}

	const { theme }: { theme: string } = await request.json();

	const userRepo = locals.di.get<UserRepo>(userRepoServiceId);
	const user = await userRepo.getUserById(sub);

	if (!user) {
		locals.logger.warn(`No User Id: ${sub}, RETURNED`);
		return json({});
	}

	await userRepo.updateUserTheme(user.id, theme);

	return json({});
}
