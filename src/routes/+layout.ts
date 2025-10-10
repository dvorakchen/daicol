import type { RequestEvent } from '@sveltejs/kit';
import type { UserSignInInfo } from '../lib/share/user.ts';

export const prerender = true;

export async function load({ fetch }: RequestEvent) {
	const response = await fetch(`api/users/sign-in-info`);
	const data = await response.json();

	return {
		userSignInInfo: data as UserSignInInfo
	};
}
