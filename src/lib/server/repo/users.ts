import { users } from '$lib/server/db/schema/index.ts';
import { db } from '$lib/server/db/index.ts';
import { and, arrayContains, eq, sql } from 'drizzle-orm';
import { UserPermissions, UserStatus } from '$lib/share/user.ts';
import bcrypt from 'bcryptjs';
import { injectable, type ServiceIdentifier } from 'inversify';
import type { User } from '$lib/server/db/schema/index.ts';

export interface UserRepo {
	createUserByPhone(phone: string): Promise<User>;
	createUserByUsername(username: string, password: string): Promise<User | undefined>;
	getUserByPhone(phone: string): Promise<User | undefined>;
	getUserById(id: number): Promise<User | undefined>;
	getUserByUsername(username: string): Promise<User | undefined>;
	getEnabledUserById(id: number): Promise<User | undefined>;
	getAdminUserById(id: number): Promise<User | undefined>;
	updateUserTheme(id: number, theme: string): Promise<void>;
}

export const userRepoServiceId: ServiceIdentifier<UserRepo> = Symbol.for('userRepoServiceId');

@injectable()
export class PgUserRepo implements UserRepo {
	async createUserByPhone(phone: string): Promise<User> {
		const user = await db.query.users.findFirst({
			where: eq(users.phoneNumber, phone)
		});

		if (user) {
			throw `phone number: ${phone} already exists`;
		}

		const NEW_USER_DEFAULT_POINTS = 2;

		const newUser = await db
			.insert(users)
			.values({
				userName: '',
				phoneNumber: phone,
				email: '',
				profilePicture: '',
				attributes: {},
				permissions: [UserPermissions.BaseAccess],
				points: NEW_USER_DEFAULT_POINTS,
				status: UserStatus.Enabled,
				createAt: sql`now()`,
				updateAt: sql`now()`
			})
			.returning()!;

		return newUser[0];
	}
	async createUserByUsername(username: string, password: string): Promise<User | undefined> {
		let signUpUser;

		const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));

		await db.transaction(async (tx) => {
			const user = await tx.query.users.findFirst({
				where: eq(users.userName, username)
			});

			if (user) {
				throw `username: ${username} already exists`;
			}

			const NEW_USER_DEFAULT_POINTS = 2;

			const newUser = await tx
				.insert(users)
				.values({
					userName: username,
					hashedPassword: hashed,
					phoneNumber: '',
					email: '',
					profilePicture: '',
					permissions: [UserPermissions.BaseAccess],
					attributes: {},
					points: NEW_USER_DEFAULT_POINTS,
					status: UserStatus.Enabled,
					createAt: sql`now()`,
					updateAt: sql`now()`
				})
				.returning()!;

			signUpUser = newUser[0];
		});

		return signUpUser;
	}
	async getUserByPhone(phone: string): Promise<User | undefined> {
		return await db.query.users.findFirst({
			where: eq(users.phoneNumber, phone)
		});
	}
	async getUserById(id: number): Promise<User | undefined> {
		return await db.query.users.findFirst({
			where: eq(users.id, id)
		});
	}
	async getUserByUsername(username: string): Promise<User | undefined> {
		return await db.query.users.findFirst({
			where: eq(users.userName, username)
		});
	}
	async getEnabledUserById(id: number): Promise<User | undefined> {
		return await db.query.users.findFirst({
			where: and(eq(users.id, id), eq(users.status, UserStatus.Enabled))
		});
	}
	async getAdminUserById(id: number): Promise<User | undefined> {
		return await db.query.users.findFirst({
			where: and(
				eq(users.id, id),
				eq(users.status, UserStatus.Enabled),
				arrayContains(users.permissions, [UserPermissions.AdminAccess])
			)
		});
	}
	async updateUserTheme(id: number, theme: string): Promise<void> {
		await db
			.update(users)
			.set({
				attributes: sql`jsonb_set(${users.attributes}, '{theme}', ${JSON.stringify(
					theme
				)}::jsonb, true)`
			})
			.where(eq(users.id, id));
	}
}
