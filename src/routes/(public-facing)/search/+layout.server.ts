import type { RequestEvent } from '@sveltejs/kit';

export const prerender = false;

export function load({ url }: RequestEvent) {
	const s = url.searchParams.get('s') ?? '';

	return {
		s
	};
}
