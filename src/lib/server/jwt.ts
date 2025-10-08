import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { DateTime } from 'luxon';

export const JWT_COOKIE_KEY = 'jwt';

export type JwtPayload = Record<string, unknown> & {
	/** user id */
	sub: number;
	iss: 'Daicol Official';
	aud: 'Daicol Client';
	iat: number;
	exp: number;
};

export function sign(sub: number, exp: number): string {
	return jwt.sign(
		{
			sub,
			iss: 'Daicol Official',
			aud: 'Daicol Client',
			iat: DateTime.utc().toSeconds(),
			exp
		} as JwtPayload,
		env.JWT_KEY!,
		{ algorithm: 'HS256' }
	);
}

export function isJwtValid(token: string): boolean {
	try {
		jwt.verify(token, env.JWT_KEY!);
		return true;
	} catch (e) {
		console.error('JWT verification failed:', e);
		return false;
	}
}

export function getJwtPayload(token: string): JwtPayload {
	const decoded = jwt.verify(token, env.JWT_KEY!);

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

export function tryGetPayloadSub(token: string) {
	if (!token) {
		console.warn('No JWT found in cookies, RETURNED');
		return null;
	}

	if (!env.JWT_KEY) {
		console.warn('No JWT KEY, RETURNED');
		console.error('JWT_KEY is not set in environment variables.');
	}

	if (!isJwtValid(token)) {
		console.warn('invald JWT or expired, RETURNED');
		return null;
	}

	const payload = getJwtPayload(token) as JwtPayload;
	if (!payload.sub) {
		console.warn('No sub IN JWT, RETURNED');
		return null;
	}

	return payload.sub;
}
