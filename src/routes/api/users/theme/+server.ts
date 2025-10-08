import { json, type RequestEvent } from "@sveltejs/kit";
import { db } from "$lib/server/db/index.ts";
import { JWT_COOKIE_KEY, tryGetPayloadSub } from "$lib/server/jwt.ts";
import { users } from "$lib/server/db/schema/users.ts";
import { eq, sql } from "drizzle-orm";

export async function POST({ request, cookies }: RequestEvent) {
  console.log("Handling theme update request");
  const jwt = cookies.get(JWT_COOKIE_KEY);

  const sub = tryGetPayloadSub(jwt || "");
  if (!sub) {
    return json({});
  }

  const { theme }: { theme: string } = await request.json();

  console.log("Received theme update:", theme);

  const user = await db.query.users.findFirst({
    where: eq(users.id, sub),
  });
  if (!user) {
    console.warn(`No User Id: ${sub}, RETURNED`);
    return json({});
  }

  console.log(`Updating theme for user ${user.id} to ${theme}`);

  await db
    .update(users)
    .set({
      attributes: sql`jsonb_set(${users.attributes}, '{theme}', ${
        JSON.stringify(theme)
      }::jsonb, true)`,
    })
    .where(eq(users.id, user.id));

  return json({});
}
