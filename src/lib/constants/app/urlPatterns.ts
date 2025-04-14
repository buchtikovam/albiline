import type { Locale } from '$lib/paraglide/runtime';

interface UrlPattern {
	pattern: string;   
	localized: [Locale, string][];
}

export const urlPatterns: UrlPattern[] = [
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
