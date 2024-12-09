import { writable, type Writable } from "svelte/store";
import { persisted } from 'svelte-persisted-store'

export const isMobileLayoutExpandedStore: Writable<boolean> = writable(false);

export const isMobileStore: Writable<boolean> = writable(false);

export const sessionKeyStore: Writable<string> = persisted(
	'sessionKey',
	undefined,
	{ storage: 'session' }
);

export const disableInputs: Writable<boolean> = writable(false);

export const pageCompactStore: Writable<boolean> = persisted("pageCompactStore", false);

// boolean runa pro zobrazení fulltextového vyhledávání
export const showFulltextSearch: { value: boolean } = $state({ value: false });

// runa pro uhování hodnoty fulltextového vyhledávání, po změně se po debounce provolá rq na BE
export const fulltextFilterValue: { value: string } = $state({ value: "" });
