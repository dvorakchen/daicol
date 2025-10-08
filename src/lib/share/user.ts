export enum UserStatus {
	Enabled = 0,
	Disabled = 1,
	Deleted = 2
}

export type UserAttributes = {
	lang?: string;
	theme?: string;
};
