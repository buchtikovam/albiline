import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {SvelteKitPWA} from "@vite-pwa/sveltekit";
const env = process.env;

export default defineConfig({
	plugins: [
		sveltekit(),

		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
		}),

		SvelteKitPWA({
			srcDir: './src',
			strategies: 'generateSW',
			filename: undefined,
			base: '/',
			scope: '/',
			selfDestroying: env.ENVIRONMENT === 'development',
			pwaAssets: {
				config: true,
			},
			manifest: {
				short_name: 'Albiline',
				name: 'Albiline 2.0',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: "#dbfeff",
				background_color: "#dbfeff",
			},
			injectManifest: {
				globPatterns: env.ENVIRONMENT === 'development'
					? ['**/*.{js,css,ico,png,svg,webp,woff,woff2}']
					: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: env.ENVIRONMENT === 'development'
					? ['**/*.{js,css,ico,png,svg,webp,woff,woff2}']
					: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, // 5 MB
			},
			devOptions: {
				enabled: env.ENVIRONMENT === 'development',
				suppressWarnings: false,
				type: 'module',
				navigateFallback: '/',
			},
			kit: {
				includeVersionFile: true,
			}
		}),

	],
	build: {
		chunkSizeWarningLimit: 3000,
	}
});
