import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import IISAdapter from 'sveltekit-adapter-iis';
import env from './env.js';

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
			origin: env.ORIGIN,
		}),
		serviceWorker: {
			register: false,
		},
		files: {
			serviceWorker: undefined,
		},
		prerender: {
			origin: env.ORIGIN,
		},
	},
}

export default config;
