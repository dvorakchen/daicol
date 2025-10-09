import { json, type RequestEvent } from "@sveltejs/kit";
import { db } from "$lib/server/db/index.ts";
import { m } from "$lib/paraglide/messages.js";
import { and, eq } from "drizzle-orm";
import { smsCaptcha } from "$lib/server/db/schema/sms_captcha.ts";
import { JWT_COOKIE_KEY, sign } from "$lib/server/jwt.ts";
import { users } from "$lib/server/db/schema/users.ts";
import { createUser } from "$lib/server/repo/users.ts";
import { DateTime } from "luxon";
import logger from '$lib/server/log.ts';

export async function POST({ request, cookies }: RequestEvent) {
  const data: { phone: string; code: string } = await request.json();
  const phone = data.phone?.toString() ?? "";
  const code = data.code?.toString() ?? "";
  
  if (!phone || phone.length !== 11 || !code || code.length !== 4) {
    logger.error(`invalid: ${phone} - ${code}`);
    return json({ error: m["sign_in.error.invalid"]() }, { status: 422 });
  }

  const sms = await db.query.smsCaptcha.findFirst({
    where: and(
      eq(smsCaptcha.phoneNumber, phone),
      eq(smsCaptcha.code, code),
      eq(smsCaptcha.isUsed, false),
    ),
  });
  if (!sms) {
    logger.info( m["sign_in.error.no_code"]())
    return json({
      error: m["sign_in.error.no_code"](),
    }, { status: 422 });
  }

  await db.update(smsCaptcha).set({ isUsed: true }).where(
    eq(smsCaptcha.phoneNumber, phone),
  );

  let user = await db.query.users.findFirst({
    where: eq(users.phoneNumber, phone),
  });

  if (!user) {
    user = await createUser(phone);
  }

  const token = sign(user.id, DateTime.utc().plus({ weeks: 1 }).toSeconds());

  cookies.set(JWT_COOKIE_KEY, token, {
    path: "/",
  });

  return json({});
}
