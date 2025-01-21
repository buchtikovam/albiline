import { LocalStore, localStore } from '$lib/utils/browser-storage/localStorage.svelte';
import { SessionStore, sessionStore } from '$lib/utils/browser-storage/sessionStorage.svelte';


export const isMobile: { value: boolean } = $state({ value: false });

export const sessionKey: SessionStore<string> = sessionStore('sessionKey', "504a58f3-58b2-48f9-8eed-40646bb9c123");

export const disableInputs: { value: boolean } = $state({ value: false });

export const pageCompact: LocalStore<boolean>= localStore("pageCompact", false );

export const showFulltextSearch: { value: boolean } = $state({ value: false });

export const fulltextFilterValue: { value: string } = $state({ value: "" });

export const activeTabIndex: { value: number } = $state({ value: 0 });

export const authDetails: { sessionCode: string|null, userName: string|null } = $state({ sessionCode: null, userName: null });
