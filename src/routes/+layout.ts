import { type RequestEvent } from '@sveltejs/kit';
import type { UserSignInInfo } from '$lib/share/user.ts';

export async function load({ fetch }: RequestEvent): Promise<{
	userSignInInfo: UserSignInInfo;
}> {
	const response = await fetch(`/api/users/sign-in-info`);
	// console.log(`Have a good day`);

	if (!response.ok) {
		console.error(response.status, `Failed to fetch sign-in info: ${response.statusText}`);
		return {
			userSignInInfo: {} as UserSignInInfo
		};
	}

	const data = await response.json();
	return {
		userSignInInfo: data as UserSignInInfo
	};
}
