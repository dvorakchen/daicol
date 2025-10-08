import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.ts';
import { smsCaptcha } from '$lib/server/db/schema/sms_captcha.ts';
import { eq, sql } from 'drizzle-orm';

export async function POST({ request }: RequestEvent) {
	console.log(`handle api captcha/send`);
	const { phone }: { phone: string } = await request.json();
	const code = Math.floor(Math.random() * 10000).toString();
	console.log(`phone: ${phone}, code: ${code}`);

	await db.transaction(async (tx) => {
		const sms = await tx.query.smsCaptcha.findFirst({
			where: eq(smsCaptcha.phoneNumber, phone)
		});
		if (sms) {
			console.log(`has sms record about phone: ${phone}, update`);
			await tx
				.update(smsCaptcha)
				.set({
					isUsed: false,
					code,
					createAt: sql`now()`
				})
				.where(eq(smsCaptcha.phoneNumber, phone));
		} else {
			console.log(`has NOT sms record about phone: ${phone}, insert`);
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
