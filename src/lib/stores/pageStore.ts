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

export const disableNavigationStore: Writable<boolean> = writable(false);

export const disablePageTabsStore: Writable<boolean> = writable(false);

export const pageCompactStore: Writable<boolean> = persisted("pageCompactStore", false);
