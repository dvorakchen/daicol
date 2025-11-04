import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { UserPermissions } from '$lib/share/user.ts';
import { getAdminUserById } from '$lib/server/repo/users.ts';

export async function load({ cookies }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies);

	if (sub === null) {
		return redirect(302, `/signin`);
	}

	const user = await getAdminUserById(sub);

	if (!user) {
		return redirect(302, '/signin');
	}

	if (!user.permissions.some((t) => t === UserPermissions.AdminAccess)) {
		return redirect(302, '/signin');
	}
}
