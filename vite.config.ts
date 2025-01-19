import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
const env = process.env;

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
			selfDestroying: env.ENVIRONMENT === 'develop',
			pwaAssets: {
				config: true,
			},
			manifest: {
				short_name: 'Albiline',
				name: 'Albiline',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: "#073545",
				background_color: "#073545",
			},
			injectManifest: {
				globPatterns: env.ENVIRONMENT === 'develop'
					? ['**/*.{js,css,ico,png,svg,webp,woff,woff2}']
					: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: env.ENVIRONMENT === 'develop'
					? ['**/*.{js,css,ico,png,svg,webp,woff,woff2}']
					: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, // 5 MB
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
