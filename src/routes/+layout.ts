import { error, type RequestEvent } from '@sveltejs/kit';
import type { UserSignInInfo } from '$lib/share/user.ts';

export async function load({ fetch }: RequestEvent) {
	const response = await fetch(`/api/users/sign-in-info`);

	if (!response.ok) {
		throw error(response.status, `Failed to fetch sign-in info: ${response.statusText}`);
	}

	const data = await response.json();

	return {
		userSignInInfo: data as UserSignInInfo
	};
}
