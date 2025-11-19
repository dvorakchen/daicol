import { isJwtValid, tryGetPayloadSub } from '$lib/server/jwt.ts';
import type { UserRepo } from '$lib/server/repo/users.ts';
import { UserStatus } from '$lib/share/index.ts';

export async function isAdmin(
	jwtToken: string,
	jwtKey: string,
	userRepo: UserRepo
): Promise<boolean> {
	if (!isJwtValid(jwtToken, jwtKey)) {
		return false;
	}

	const sub = tryGetPayloadSub(jwtToken, jwtKey);
	if (!sub) {
		return false;
	}

	const user = await userRepo.getAdminUserById(sub);

	return user?.status === UserStatus.Enabled;
}
