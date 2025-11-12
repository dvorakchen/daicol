import { json, type RequestEvent } from '@sveltejs/kit';
import { m } from '$lib/paraglide/messages.js';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

export async function POST({ request, locals }: RequestEvent) {
	const {
		username,
		password,
		rePassword
	}: { username: string; password: string; rePassword: string } = await request.json();

	if (!username || !password || !rePassword) {
		locals.logger.error(`invalid: ${username} - ${password}`);
		return json(
			{ error: m['sign_in.error.invalid_username_password']() },
			{
				status: 422
			}
		);
	}

	locals.logger.info(`Sign-up, username: ${username}`);
	const userRepo = locals.di.get<UserRepo>(userRepoServiceId);
	if (await userRepo.getUserByUsername(username)) {
		return json(
			{ error: m['sign_up.error.username_exists']() },
			{
				status: 422
			}
		);
	}

	if (password !== rePassword) {
		return json({ error: m['sign_up.passwords_not_match']() }, { status: 422 });
	}

	const signUpUser = await userRepo.createUserByUsername(username, password);
	if (signUpUser) {
		return json({}, { status: 200 });
	}

	return json({ error: m['sign_up.error.failed'] }, { status: 422 });
}
