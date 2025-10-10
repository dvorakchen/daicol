import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.ts';
import { smsCaptcha } from '$lib/server/db/schema/sms_captcha.ts';
import { eq, sql } from 'drizzle-orm';
import logger from '$lib/server/log.ts';
import { m } from '$lib/paraglide/messages.js';

export async function POST({ request }: RequestEvent) {
	logger.info(`handle api captcha/send`);
	const { phone }: { phone: string } = await request.json();

	if (!/^\d{11}$/.test(phone)) {
		return json(
			{
				error: m['sign_in.error.invalid_phone']()
			},
			{ status: 422 }
		);
	}

	const code = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, '0');
	logger.info(`phone: ${phone}, code: ${code}`);

	await db.transaction(async (tx) => {
		const sms = await tx.query.smsCaptcha.findFirst({
			where: eq(smsCaptcha.phoneNumber, phone)
		});
		if (sms) {
			logger.info(`has sms record about phone: ${phone}, update`);
			await tx
				.update(smsCaptcha)
				.set({
					isUsed: false,
					code,
					createAt: sql`now()`
				})
				.where(eq(smsCaptcha.phoneNumber, phone));
		} else {
			logger.info(`has NOT sms record about phone: ${phone}, insert`);
			await tx.insert(smsCaptcha).values({
				phoneNumber: phone,
				code,
				createAt: sql`now()`
			});
		}
	});

	// todo: send code to phone

	return json(null);
}
