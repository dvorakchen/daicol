import { json, type RequestEvent } from '@sveltejs/kit';
import { m } from '$lib/paraglide/messages.js';
import { updateNewSmsCode } from '$lib/server/repo/smsCaptcha.ts';

export async function POST({ request, locals }: RequestEvent) {
	locals.logger.info(`handle api captcha/send`);
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
	locals.logger.info(`phone: ${phone}, code: ${code}`);

	await updateNewSmsCode(phone, code);

	// todo: send code to phone

	return json(null);
}
