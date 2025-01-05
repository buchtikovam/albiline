import { LocalStore, localStore } from '$lib/utils/local-storage/localStorage.svelte';
import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';


export const openedTabs: LocalStore<HeaderTab[]> = localStore("openedTabs", []);

export const disableNavigation: { value: boolean } = $state({ value: false });

export const disablePageTabs: { value: boolean } = $state({ value: false });

// export let currentActiveTabRune = $state("");
//
