import {paraglideVitePlugin} from '@inlang/paraglide-js'
import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import {SvelteKitPWA} from "@vite-pwa/sveltekit";
const env = process.env;
import devtoolsJson from 'vite-plugin-devtools-json';
// import basicSsl from "@vitejs/plugin-basic-ssl"


export default defineConfig({
	plugins: [
		// basicSsl(),
		sveltekit(),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ["url", "cookie", "baseLocale"],
			urlPatterns: [
				{
					pattern: "/",
					localized: [
						["cz", "/"],
						["sk", "/sk"],
						["pl", "/pl"],
						["en", "/en"],
					],
				},
				{
					pattern: "/profil",
					localized: [
						["cz", "/profil"],
						["sk", "/sk/profil"],
						["pl", "/pl/profil"],
						["en", "/en/profile"],
					],
				},
				{
					pattern: "/nastaveni",
					localized: [
						["cz", "/nastaveni"],
						["sk", "/sk/nastavenie"],
						["pl", "/pl/ustawienia"],
						["en", "/en/settings"],
					],
				},
				{
					pattern: "/sklad/stav-skladu",
					localized: [
						["cz", "/sklad/stav-skladu"],
						["sk", "/sk/sklad/stav-skladu"],
						["pl", "/pl/sklad/stav-skladu"],
						["en", "/en/warehouse/inventory-status"],
					],
				},
				{
					pattern: "/prodej/zakaznici",
					localized: [
						["cz", "/prodej/zakaznici"],
						["sk", "/sk/prodej/zakaznici"],
						["pl", "/pl/prodej/zakaznici"],
						["en", "/en/sales/customers"],
					],
				},
				{
					pattern: "/prodej/zakaznici/:customerNodeCode",
					localized: [
						["cz", "/prodej/zakaznici/:customerNodeCode"],
						["sk", "/sk/prodej/zakaznici/:customerNodeCode"],
						["pl", "/pl/prodej/zakaznici/:customerNodeCode"],
						["en", "/en/sales/customers/:customerNodeCode"],
					],
				},
				{
					pattern: "/prodej/zakaznici/:customerNodeCode/prodejny/:customerAddressCode",
					localized: [
						["cz", "/prodej/zakaznici/:customerNodeCode/prodejny/:customerAddressCode"],
						["sk", "/sk/prodej/zakaznici/:customerNodeCode/prodejny/:customerAddressCode"],
						["pl", "/pl/prodej/zakaznici/:customerNodeCode/prodejny/:customerAddressCode"],
						["en", "/en/sales/customers/:customerNodeCode/addresses/:customerAddressCode"],
					],
				},
			]
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
	},
});
