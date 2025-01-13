// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
//
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// 	// for more information about preprocessors
// 	preprocess: [vitePreprocess({})],
//
// 	kit: {
// 		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
// 		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
// 		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
// 		adapter: adapter(),
// 		serviceWorker: {
// 			register: false,
// 		},
// 		// files: {
// 		// 	serviceWorker: undefined,
// 		// }
// 	},
// };
//
// export default config;


import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import IISAdapter from 'sveltekit-adapter-iis'

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
			origin: 'http://localhost:3001',
		}),
		outDir: './.svelte-kit/adapter-iis/app/client',
		serviceWorker: {
			register: false,
		},
		files: {
			serviceWorker: undefined,
		},
	},
}

export default config
