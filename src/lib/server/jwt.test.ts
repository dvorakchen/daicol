import { describe, expect, it } from 'vitest';
import { getJwtPayload, isJwtValid, signJWT, tryGetPayloadSub } from './jwt.ts';
import { DateTime } from 'luxon';

describe('sign jwt', () => {
	it('sign', () => {
		const sub = 100;
		const exp = DateTime.utc().toSeconds();
		const token = signJWT(sub, exp);

		expect(token).not.toBe('');
	});
});

describe('is valid', () => {
	it('valid', () => {
		const sub = 100;
		const exp = DateTime.utc().plus({ days: 1 }).toSeconds();
		const token = signJWT(sub, exp);
		const res = isJwtValid(token);

		expect(res).toBe(true);
	});

	it('invalid', () => {
		const INVALID_TOKEN = 'invalid.token.here';

		const res = isJwtValid(INVALID_TOKEN);
		expect(res).toBe(false);
	});
});

describe('get payload', () => {
	it('get payload', () => {
		const sub = 100;
		const exp = DateTime.utc().plus({ days: 1 }).toSeconds();
		const token = signJWT(sub, exp);

		const payload = getJwtPayload(token);

		expect(payload.sub).toBe(sub);
		expect(payload.iss).toBe('Daicol Official');
		expect(payload.aud).toBe('Daicol Client');
		expect(payload.exp).toBe(exp);
	});

	it('get payload fail', () => {
		expect(() => getJwtPayload('')).toThrowError();
	});
});

describe('get try payload', () => {
	it('get try payload', () => {
		const sub = 100;
		const exp = DateTime.utc().plus({ days: 1 }).toSeconds();
		const token = signJWT(sub, exp);

		const res = tryGetPayloadSub(token);

		expect(res).not.toBeNull();
		expect(res).toBe(sub);
	});

	it('get try payload return null', () => {
		const sub = tryGetPayloadSub('');

		expect(sub).toBeNull();
	});
});
