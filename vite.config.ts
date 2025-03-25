import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
const env = process.env;

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
		}),

		// SvelteKitPWA({
		// 	srcDir: './src',
		// 	mode: 'development',
		// 	strategies: 'generateSW',
		// 	filename: undefined,
		// 	base: '/',
		// 	scope: '/',
		// 	selfDestroying: env.ENVIRONMENT === 'development',
	// 	pwaAssets: {
		// 		config: true,
		// 	},
		// 	manifest: {
		// 		short_name: 'Albiline',
		// 		name: 'Albiline',
		// 		start_url: '/',
		// 		scope: '/',
		// 		display: 'standalone',
		// 		theme_color: "#073545",
		// 		background_color: "#073545",
		// 	},
		// 	injectManifest: {
		// 		globPatterns: env.ENVIRONMENT === 'development'
		// 			? ['**/*.{js,css,ico,png,svg,webp,woff,woff2}']
		// 			: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
		// 	},
		// 	workbox: {
		// 		globPatterns: env.ENVIRONMENT === 'development'
		// 			? ['**/*.{js,css,ico,png,svg,webp,woff,woff2}']
		// 			: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
		// 		maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, // 5 MB
		// 	},
		// 	devOptions: {
		// 		enabled: env.ENVIRONMENT === 'development',
		// 		suppressWarnings: false,
		// 		type: 'module',
		// 		navigateFallback: '/',
		// 	},
		// 	kit: {
		// 		includeVersionFile: true,
		// 	}
		// }),

	],
	build: {
		chunkSizeWarningLimit: 3000,
	}
});
