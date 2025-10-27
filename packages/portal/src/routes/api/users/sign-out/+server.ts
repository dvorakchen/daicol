import { text, type RequestEvent } from '@sveltejs/kit';
import { setJWTCookie } from '$lib/server/jwt.ts';

export function POST({ cookies }: RequestEvent) {
	setJWTCookie(cookies, '');

	return text('');
}
