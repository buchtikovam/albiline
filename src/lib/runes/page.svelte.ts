import { localStore } from '$lib/utils/local-storage/localStorage.svelte';

// export const isMobileLayoutExpandedStore: Writable<boolean> = writable(false);
//
// export const isMobileStore: Writable<boolean> = writable(false);
//
// export const sessionKeyStore: Writable<string> = persisted(
// 	'sessionKey',
// 	undefined,
// 	{ storage: 'session' }
// );

// export const disableInputs: Writable<boolean> = writable(false);

// @ts-expect-error Type LocalStore is an issue in components, doesn't affect runtime
export const pageCompact: { value: boolean } = localStore("pageCompact", { value: false });

// boolean runa pro zobrazení fulltextového vyhledávání
export const showFulltextSearch: { value: boolean } = $state({ value: false });

// runa pro uhování hodnoty fulltextového vyhledávání, po změně se po debounce provolá rq na BE
export const fulltextFilterValue: { value: string } = $state({ value: "" });
