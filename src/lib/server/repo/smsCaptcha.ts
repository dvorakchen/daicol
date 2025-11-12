import { db } from '$lib/server/db/index.ts';
import { and, eq, sql } from 'drizzle-orm';
import { smsCaptcha } from '$lib/server/db/schema/index.ts';

export async function updateNewSmsCode(phone: string, code: string) {
	await db.transaction(async (tx) => {
		const sms = await tx.query.smsCaptcha.findFirst({
			where: eq(smsCaptcha.phoneNumber, phone)
		});
		if (sms) {
			await tx
				.update(smsCaptcha)
				.set({
					isUsed: false,
					code,
					createAt: sql`now()`
				})
				.where(eq(smsCaptcha.phoneNumber, phone));
		} else {
			await tx.insert(smsCaptcha).values({
				phoneNumber: phone,
				code,
				createAt: sql`now()`
			});
		}
	});
}

export async function getUnusedSms(phone: string, code: string) {
	return await db.query.smsCaptcha.findFirst({
		where: and(
			eq(smsCaptcha.phoneNumber, phone),
			eq(smsCaptcha.code, code),
			eq(smsCaptcha.isUsed, false)
		)
	});
}

export async function updateToUsed(phone: string) {
	await db.update(smsCaptcha).set({ isUsed: true }).where(eq(smsCaptcha.phoneNumber, phone));
}
