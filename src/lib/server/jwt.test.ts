import { describe, expect, it } from 'vitest';
import { getJwtPayload, isJwtValid, signJWT, tryGetPayloadSub } from './jwt.ts';
import { DateTime } from 'luxon';

const JWT_KEY = 'KEY';
describe('sign jwt', () => {
	it('sign', () => {
		const sub = 100;
		const exp = DateTime.utc().toSeconds();
		const token = signJWT(sub, exp, JWT_KEY);

		expect(token).not.toBe('');
	});
});

describe('is valid', () => {
	it('valid', () => {
		const sub = 100;
		const exp = DateTime.utc().plus({ days: 1 }).toSeconds();
		const token = signJWT(sub, exp, JWT_KEY);
		const res = isJwtValid(token, JWT_KEY);

		expect(res).toBe(true);
	});

	it('invalid', () => {
		const INVALID_TOKEN = 'invalid.token.here';

		const res = isJwtValid(INVALID_TOKEN, JWT_KEY);
		expect(res).toBe(false);
	});
});

describe('get payload', () => {
	it('get payload', () => {
		const sub = 100;
		const exp = DateTime.utc().plus({ days: 1 }).toSeconds();
		const token = signJWT(sub, exp, JWT_KEY);

		const payload = getJwtPayload(token, JWT_KEY);

		expect(payload.sub).toBe(sub);
		expect(payload.iss).toBe('Daicol Official');
		expect(payload.aud).toBe('Daicol Client');
		expect(payload.exp).toBe(exp);
	});

	it('get payload fail', () => {
		expect(() => getJwtPayload('', JWT_KEY)).toThrowError();
	});
});

describe('get try payload', () => {
	it('get try payload', () => {
		const sub = 100;
		const exp = DateTime.utc().plus({ days: 1 }).toSeconds();
		const token = signJWT(sub, exp, JWT_KEY);

		const res = tryGetPayloadSub(token, JWT_KEY);

		expect(res).not.toBeNull();
		expect(res).toBe(sub);
	});

	it('get try payload return null', () => {
		const sub = tryGetPayloadSub('', JWT_KEY);

		expect(sub).toBeNull();
	});
});
