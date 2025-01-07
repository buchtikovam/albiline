import { LocalStore, localStore } from '$lib/utils/local-storage/localStorage.svelte';
import { SessionStore, sessionStore } from '$lib/utils/local-storage/sessionStorage.svelte';

// export const isMobileLayoutExpandedStore: Writable<boolean> = writable(false);
//
// export const isMobileStore: Writable<boolean> = writable(false);
//
export const sessionKey: SessionStore<string|null> = sessionStore('sessionKey', "504a58f3-58b2-48f9-8eed-40646bb9c123");

export const disableInputs: { value: boolean } = $state({ value: false });

export const pageCompact: LocalStore<boolean>= localStore("pageCompact", false );

// boolean runa pro zobrazení fulltextového vyhledávání
export const showFulltextSearch: { value: boolean } = $state({ value: false });

// runa pro uhování hodnoty fulltextového vyhledávání, po změně se po debounce provolá rq na BE
export const fulltextFilterValue: { value: string } = $state({ value: "" });

export const activeTabIndex: { value: number } = $state({ value: 0 })
