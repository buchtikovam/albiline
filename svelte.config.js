import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import IISAdapter from 'sveltekit-adapter-iis';
import * as process from 'node:process';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		version: {
			pollInterval: 300000,
		},
		adapter: IISAdapter({
			iisNodeOptions: {
				nodeProcessCommandLine: 'C:\\Program Files\\nodejs\\node.exe',
			},
			origin: process.env.PUBLIC_ORIGIN,
		}),
		serviceWorker: {
			register: false,
		},
		files: {
			serviceWorker: undefined,
		},
		prerender: {
			origin: process.env.PUBLIC_ORIGIN,
			crawl: false,
			// entries: []
		},
		paths: {
			relative: false,
			base: process.env.PUBLIC_ORIGIN,
		}
	},
}

export default config
