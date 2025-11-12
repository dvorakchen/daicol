import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { UserPermissions } from '$lib/share/user.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

export async function load({ cookies, locals }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies, locals.privateEnv.JWT_KEY);

	if (sub === null) {
		return redirect(302, `/signin`);
	}

	const userRepo = locals.di.get<UserRepo>(userRepoServiceId);

	const user = await userRepo.getAdminUserById(sub);

	if (!user) {
		return redirect(302, '/signin');
	}

	if (!user.permissions.some((t) => t === UserPermissions.AdminAccess)) {
		return redirect(302, '/signin');
	}
}
