import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';
import 'vite-plugin-pwa/pwa-assets';
import type { AvailableLanguageTag } from "$lib/paraglide/runtime";
import type { ParaglideLocals } from '@inlang/paraglide-sveltekit';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			paraglide: ParaglideLocals<AvailableLanguageTag>
		}

		interface Error {
			message: string,
		}

		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
