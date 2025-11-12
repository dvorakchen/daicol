// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Container } from 'inversify';
import type { Logger } from '$lib/server/logger/index.ts';
import { env as privateEnv } from '$env/dynamic/private';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId: number | undefined;
			di: Container;
			logger: Logger;
			privateEnv: typeof privateEnv;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
