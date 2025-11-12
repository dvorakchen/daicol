// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Container } from "inversify";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId: number | undefined;
			di: Container;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
