import { json, type RequestEvent } from '@sveltejs/kit';
import logger from '$lib/server/log.ts';
import { m } from '$lib/paraglide/messages.js';
import { updateNewSmsCode } from '$lib/server/repo/smsCaptcha.ts';

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

	await updateNewSmsCode(phone, code);

	// todo: send code to phone

	return json(null);
}
