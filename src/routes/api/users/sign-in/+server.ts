import { json, type RequestEvent } from "@sveltejs/kit";
import { m } from "$lib/paraglide/messages.js";
import { setJWTCookie, signJWT } from "$lib/server/jwt.ts";
import { createUserByPhone, getUserByPhone } from "$lib/server/repo/users.ts";
import { DateTime } from "luxon";
import logger from "$lib/server/log.ts";
import type { UserSignInInfo } from "$lib/share/user.ts";
import { getUnusedSms, updateToUsed } from "$lib/server/repo/smsCaptcha.ts";

export async function POST({ request, cookies }: RequestEvent) {
  const data: { phone: string; code: string } = await request.json();
  const phone = data.phone?.toString() ?? "";
  const code = data.code?.toString() ?? "";

  if (!phone || phone.length !== 11 || !code || code.length !== 4) {
    logger.error(`invalid: ${phone} - ${code}`);
    return json({ error: m["sign_in.error.invalid"]() }, { status: 422 });
  }

  const sms = await getUnusedSms(phone, code);
  if (!sms) {
    logger.info(m["sign_in.error.no_code"]());
    return json(
      {
        error: m["sign_in.error.no_code"](),
      },
      { status: 422 },
    );
  }

  await updateToUsed(phone);

  let user = await getUserByPhone(phone);

  if (!user) {
    user = await createUserByPhone(phone);
  }

  const token = signJWT(user.id, DateTime.utc().plus({ weeks: 1 }).toSeconds());

  setJWTCookie(cookies, token);

  return json({
    id: user.id,
    username: user.userName,
    points: user.points,
  } as UserSignInInfo);
}
