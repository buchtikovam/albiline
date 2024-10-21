import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			strategies: 'generateSW',
			filename: undefined,
			scope: '/',
			base: '/',
			selfDestroying: false,
			pwaAssets: {
				config: true,
			},
			manifest: {
				short_name: 'Albiline 2',
				name: 'Albiline 2',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: "#073545",
				background_color: "#073545",
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				suppressWarnings: false,
				type: 'module',
				navigateFallback: '/',
			},
			kit: {
				includeVersionFile: true,
			}
		})
	],
});
