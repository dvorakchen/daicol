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
import { DateTime } from 'luxon';
import { plantingSeed } from '$lib/server/db/seed.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';
import { type AppRepo, appRepoServiceId } from '$lib/server/repo/apps/index.ts';
import { AccessType } from '$lib/share/app.ts';
import { di } from '$lib/server/dependency-injection.ts';
import { type HistoryRepo, historyRepoServiceId } from '$lib/server/repo/histories.ts';
import { type Logger, loggerServiceId } from '$lib/server/logger/index.ts';

(() => {
	const log = di.get<Logger>(loggerServiceId);

	const DATABASE_URL = env.DATABASE_URL;
	if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
	log.info(`Using DATABASE_URL: ${DATABASE_URL}`);
})();

await plantingSeed(di.get<Logger>(loggerServiceId));

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
			const sub = tryGetPayloadSub(jwt || '', event.locals.privateEnv.JWT_KEY);
			if (!sub) {
				return html.replace('%theme%', '');
			}

			const userRepo = event.locals.di.get<UserRepo>(userRepoServiceId);
			const user = await userRepo.getUserById(sub);

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
	// refresh
	const token = event.cookies.get(JWT_COOKIE_KEY) ?? '';

	// TODO: check protecting route, return 401 if need auth and locals.userId undefined
	const PROTECTED = [`/api/files`];
	if (PROTECTED.some((t) => event.url.pathname.startsWith(t))) {
		if (!isJwtValid(token, event.locals.privateEnv.JWT_KEY)) {
			return new Response('', { status: 401 });
		}
	}

	const response = resolve(event);
	if (isJwtValid(token, event.locals.privateEnv.JWT_KEY)) {
		const sub = tryGetPayloadSub(token, event.locals.privateEnv.JWT_KEY);
		if (sub) {
			event.locals.userId = sub;
			const token = signJWT(
				sub,
				DateTime.utc().plus({ weeks: 1 }).toSeconds(),
				event.locals.privateEnv.JWT_KEY
			);
			setJWTCookie(event.cookies, token);
		}
	}
	return response;
};

const recordHistoryHandle: Handle = async ({ event, resolve }) => {
	const regex = /^\/ai\/(\d{5})\/?$/;
	const match = event.url.pathname.match(regex);
	if (match && match.length >= 1) {
		const routeId = match[1];

		const historyRepo = event.locals.di.get<HistoryRepo>(historyRepoServiceId);
		await historyRepo.addHistory(+routeId, AccessType.PageView);

		const appRepo = event.locals.di.get<AppRepo>(appRepoServiceId);
		await appRepo.increaseUsedCount(+routeId);
		event.locals.logger.info(`record routeId: ${routeId}`);
	}

	return resolve(event);
};

const dependencyHandle: Handle = ({ event, resolve }) => {
	event.locals.logger = di.get<Logger>(loggerServiceId);
	event.locals.di = di;

	return resolve(event);
};

const environmentHandle: Handle = ({ event, resolve }) => {
	event.locals.privateEnv = env;

	return resolve(event);
};

export const handle = sequence(
	environmentHandle,
	dependencyHandle,
	themeHandle,
	paraglideHandle,
	refreshAuth,
	recordHistoryHandle
);
