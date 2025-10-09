import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server.js";
import { sequence } from "@sveltejs/kit/hooks";
import { db } from "$lib/server/db/index.ts";
import { tryGetPayloadSub } from "$lib/server/jwt.ts";
import type { UserAttributes } from "$lib/share/user.ts";
import { env } from '$env/dynamic/private'
import logger from "$lib/server/log.ts";

const DATABASE_URL = env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
logger.info(`Using DATABASE_URL: ${DATABASE_URL}`);


// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(
    event.request,
    ({ request: localizedRequest, locale }) => {
      event.request = localizedRequest;
      return resolve(event, {
        transformPageChunk: ({ html }) => {
          return html.replace("%lang%", locale);
        },
      });
    },
  );

// creating a handle to use the theme middleware
const themeHandle: Handle = ({ event, resolve }) => {
  return resolve(event, {
    transformPageChunk: async ({ html }) => {
      const jwt = event.cookies.get("jwt");
      const sub = tryGetPayloadSub(jwt || "");
      if (!sub) {
        return html.replace("%theme%", "");
      }

      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, sub),
      });

      if (!user) {
        return html.replace("%theme%", "");
      }
      const theme = (user.attributes as UserAttributes).theme ?? "";
      return html.replace("%theme%", theme);
    },
  });
};

export const handle = sequence(themeHandle, paraglideHandle);
