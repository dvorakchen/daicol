import { users } from "$lib/server/db/schema/users.ts";
import { db } from "$lib/server/db/index.ts";
import { and, arrayContains, eq, sql } from "drizzle-orm";
import { UserPermissions, UserStatus } from "$lib/share/user.ts";

export async function createUserByPhone(phone: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.phoneNumber, phone),
  });

  if (user) {
    throw `phone number: ${phone} already exists`;
  }

  const newUser = await db
    .insert(users)
    .values({
      userName: "",
      phoneNumber: phone,
      email: "",
      passwordHash: "",
      profilePicture: "",
      attributes: {},
      status: UserStatus.Enabled,
      createAt: sql`now()`,
      updateAt: sql`now()`,
    })
    .returning()!;

  return newUser[0];
}

export async function getUserByPhone(phone: string) {
  return await db.query.users.findFirst({
    where: eq(users.phoneNumber, phone),
  });
}

export async function getUserById(id: number) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getEnabledUserById(id: number) {
  return await db.query.users.findFirst({
    where: and(eq(users.id, id), eq(users.status, UserStatus.Enabled)),
  });
}

export async function getAdminUserById(id: number) {
  return await db.query.users.findFirst({
    where: and(
      eq(users.id, id),
      eq(users.status, UserStatus.Enabled),
      arrayContains(users.permissions, [UserPermissions.AdminAccess]),
    ),
  });
}

export async function updateUserTheme(id: number, theme: string) {
  await db
    .update(users)
    .set({
      attributes: sql`jsonb_set(${users.attributes}, '{theme}', ${
        JSON.stringify(
          theme,
        )
      }::jsonb, true)`,
    })
    .where(eq(users.id, id));
}
