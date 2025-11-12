import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import type { Cookies } from '@sveltejs/kit';

export const JWT_COOKIE_KEY = 'jwt';

export type JwtPayload = Record<string, unknown> & {
	/** user id */
	sub: number;
	iss: 'Daicol Official';
	aud: 'Daicol Client';
	iat: number;
	exp: number;
};

export function signJWT(sub: number, exp: number, key: string): string {
	return jwt.sign(
		{
			sub,
			iss: 'Daicol Official',
			aud: 'Daicol Client',
			iat: DateTime.utc().toSeconds(),
			exp
		} as JwtPayload,
		key,
		{ algorithm: 'HS256' }
	);
}

export function isJwtValid(token: string, key: string): boolean {
	try {
		jwt.verify(token, key);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export function getJwtPayload(token: string, key: string): JwtPayload {
	const decoded = jwt.verify(token, key);

	if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
		return {
			sub: decoded.sub as unknown as number,
			iss: decoded.iss,
			aud: decoded.aud,
			iat: decoded.iat,
			exp: decoded.exp
		} as JwtPayload;
	}

	throw new Error('Invalid JWT payload');
}

export function tryGetPayloadSub(token: string, key: string) {
	if (!token) {
		return null;
	}

	// if (!env.JWT_KEY) {
	// 	logger.error('JWT_KEY is not set in environment variables.');
	// }

	if (!isJwtValid(token, key)) {
		// logger.info('invald JWT or expired, RETURNED');
		return null;
	}

	const payload = getJwtPayload(token, key) as JwtPayload;
	if (!payload.sub) {
		// logger.warn('No sub IN JWT, RETURNED');
		return null;
	}

	return payload.sub;
}

export function setJWTCookie(cookies: Cookies, value: string) {
	const A_WEEK = 60 * 60 * 24 * 7;
	cookies.set(JWT_COOKIE_KEY, value, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: A_WEEK
	});
}

export function getJWTPayloadSubFromCookie(cookies: Cookies, key: string): number | null {
	const jwt = cookies.get(JWT_COOKIE_KEY);

	const sub = tryGetPayloadSub(jwt || '', key);
	if (!sub) {
		return null;
	}

	return sub;
}
