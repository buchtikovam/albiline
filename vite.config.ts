import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { paraglide } from '@inlang/paraglide-sveltekit/vite';

export default defineConfig({
	plugins: [
		paraglide({
			//recommended
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
		}),
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			strategies: 'generateSW',
			filename: undefined,
			scope: process.env.PUBLIC_ORIGIN,
			base: process.env.PUBLIC_ORIGIN,
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
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, // 5 MB or set to something else
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
		}),
	],
	build: {
		chunkSizeWarningLimit: 3000,
	}
});
