import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server.js';
import { sequence } from '@sveltejs/kit/hooks';
import {
	isJwtValid,
	JWT_COOKIE_KEY,
	setJWTCookie,
	signJWT,
	tryGetPayloadSub
} from '$lib/server/jwt.ts';
import type { UserAttributes } from '$lib/share/user.ts';
import { env } from '$env/dynamic/private';
import logger from '$lib/server/log.ts';
import { DateTime } from 'luxon';
import { plantingSeed } from '$lib/server/db/seed.ts';
import { getUserById } from '$lib/server/repo/users.ts';
import { addHistory } from '$lib/server/repo/histories.ts';
import { AccessType } from '$lib/share/app.ts';

const DATABASE_URL = env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
logger.info(`Using DATABASE_URL: ${DATABASE_URL}`);

await plantingSeed();

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});

// creating a handle to use the theme middleware
const themeHandle: Handle = ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: async ({ html }) => {
			const jwt = event.cookies.get(JWT_COOKIE_KEY);
			const sub = tryGetPayloadSub(jwt || '');
			if (!sub) {
				return html.replace('%theme%', '');
			}

			const user = await getUserById(sub);

			if (!user) {
				return html.replace('%theme%', '');
			}
			const theme = (user.attributes as UserAttributes).theme ?? '';
			return html.replace('%theme%', theme);
		}
	});
};

/**
 * refresh the JWT if the JWT is valid
 */
const refreshAuth: Handle = ({ event, resolve }) => {
	const response = resolve(event);

	// refresh
	const token = event.cookies.get(JWT_COOKIE_KEY) ?? '';
	if (isJwtValid(token)) {
		const sub = tryGetPayloadSub(token);
		if (sub) {
			const token = signJWT(sub, DateTime.utc().plus({ weeks: 1 }).toSeconds());
			setJWTCookie(event.cookies, token);
		}
	}

	// TODO: check protecting route, return 401 if need auth

	return response;
};

const recordHistoryHandle: Handle = async ({ event, resolve }) => {
	const regex = /^\/ai\/(\d{5})\/?$/;
	const match = event.url.pathname.match(regex);
	if (match && match.length >= 1) {
		const routeId = match[1];

		await addHistory(+routeId, AccessType.PageView);
	}

	return resolve(event);
};

export const handle = sequence(themeHandle, paraglideHandle, refreshAuth, recordHistoryHandle);
