import { json, type RequestEvent } from '@sveltejs/kit';
import logger from '$lib/server/log.ts';
import { m } from '$lib/paraglide/messages.js';
import { createUserByUsername, getUserByUsername } from '$lib/server/repo/users';

export async function POST({ request }: RequestEvent) {
	const {
		username,
		password,
		rePassword
	}: { username: string; password: string; rePassword: string } = await request.json();

	if (!username || !password || !rePassword) {
		logger.error(`invalid: ${username} - ${password}`);
		return json({ error: m['sign_in.error.invalid_username_password']() }, { status: 422 });
	}

	logger.info(`Sign-up, username: ${username}`);
	if (await getUserByUsername(username)) {
		return json({ error: m['sign_up.error.username_exists']() }, { status: 422 });
	}

	if (password !== rePassword) {
		return json({ error: m['sign_up.passwords_not_match']() }, { status: 422 });
	}

	const signUpUser = await createUserByUsername(username, password);
	if (signUpUser) {
		return json({}, { status: 200 });
	}

	return json({ error: m['sign_up.error.failed'] }, { status: 422 });
}
