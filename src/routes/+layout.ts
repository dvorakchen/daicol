import { error, type RequestEvent } from '@sveltejs/kit';
import type { UserSignInInfo } from '$lib/share/user.ts';
import logger from "$lib/server/log.ts";

export async function load({ fetch }: RequestEvent) {
	const response = await fetch(`/api/users/sign-in-info`);
	logger.info(`+layout.server.ts, after fetch /api/users/sign-in-info`);

	logger.error(`${response.status}`);
	if (!response.ok) {
		throw error(response.status, `Failed to fetch sign-in info: ${response.statusText}`);
	}

	const data = await response.json();
	return {
		userSignInInfo: data as UserSignInInfo
	};
}
