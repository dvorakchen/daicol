export * from '$lib/share/search.ts';
export * from '$lib/share/app.ts';
export * from '$lib/share/user.ts';

export const themePrefer = {
	light: 'corporate',
	dark: 'sunset'
} as const;

export const UPLOAD_IMAGE_MAX_SIZE = 10 * 1024 * 1024;

export type PaginationList<T> = {
	list: T[];
	total: number;
};

export function enumToArray(enumObj: Record<string, string>): { value: string; label: string }[] {
	return Object.keys(enumObj).map((key) => ({
		value: key,
		label: enumObj[key]
	}));
}
