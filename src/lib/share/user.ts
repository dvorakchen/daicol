export enum UserStatus {
	Enabled = 0,
	Disabled = 1,
	Deleted = 2
}

export type UserAttributes = {
	lang?: string;
	theme?: string;
	permissions?: UserPermissionValue[];
};

export const UserPermissions = {
	/**
	 * base accession
	 *
	 * can view:
	 * - public facing site
	 * - sign-up, sign-in
	 *
	 * if signed-in, can:
	 * - generate AI, needs points
	 * - topup
	 */
	BaseAccess: 'BASE_ACCESS',
	/**
	 * admin accession
	 *
	 * can use administrator site
	 */
	AdminAccess: 'ADMIN_ACCESS'
} as const;

export type UserPermissionValue = (typeof UserPermissions)[keyof typeof UserPermissions];

export type UserSignInInfo = {
	id: number;
	username: string;
	points: number;
};
