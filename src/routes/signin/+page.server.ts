import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.ts';
import { m } from '$lib/paraglide/messages.js';
import { and, eq } from 'drizzle-orm';
import { smsCaptcha } from '$lib/server/db/schema/sms_captcha.ts';
import { JWT_COOKIE_KEY, sign } from '$lib/server/jwt.ts';
import { users } from '$lib/server/db/schema/users.ts';
import { createUser } from '$lib/server/repo/users.ts';
import { DateTime } from 'luxon';
import { QS_REDIRECT_KEY } from '$lib/share/index.ts';

export const prerender = false;

export const actions = {
	default: async ({ cookies, request }: RequestEvent) => {
		const data = await request.formData();
		console.log(`handle sign in: data:`, data);
		const phone = data.get('phone')?.toString() ?? '';
		const code = data.get('code')?.toString() ?? '';

		if (!phone || phone.length !== 11 || !code || code.length !== 4) {
			return fail(422, {
				error: m['sign_in.error.invalid']()
			});
		}

		const sms = await db.query.smsCaptcha.findFirst({
			where: and(
				eq(smsCaptcha.phoneNumber, phone),
				eq(smsCaptcha.code, code),
				eq(smsCaptcha.isUsed, false)
			)
		});
		if (!sms) {
			return fail(422, {
				error: m['sign_in.error.no_code']()
			});
		}

		await db.update(smsCaptcha).set({ isUsed: true }).where(eq(smsCaptcha.phoneNumber, phone));

		let user = await db.query.users.findFirst({
			where: eq(users.phoneNumber, phone)
		});

		if (!user) {
			user = await createUser(phone);
		}

		const token = sign(user.id, DateTime.utc().plus({ weeks: 1 }).toSeconds());

		cookies.set(JWT_COOKIE_KEY, token, {
			path: '/'
		});

		const qs = new URL(request.url).searchParams;

		redirect(303, qs.get(QS_REDIRECT_KEY) ?? '/');
	}
};
