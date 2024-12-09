import { localStore } from '$lib/utils/local-storage/localStorage.svelte';
import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';


// @ts-expect-error Type LocalStore is an issue in components, can't type this correctly
export const openedTabsRune: { value: HeaderTab[] } = localStore("openedTabs", { value: [] });

export const disableNavigationRune: { value: boolean } = $state({ value: false});


// export let currentActiveTabRune = $state("");
// export const disablePageTabsStore: Writable<boolean> = writable(false);
