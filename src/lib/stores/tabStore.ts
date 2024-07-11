import type { HeaderTab } from '$lib/types/sidebar/sidebar';
import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';

export const openedTabsStore: Writable<HeaderTab[]> = persisted("openedTabs", []);

export const currentActiveTabStore: Writable<string> = writable("");

export const allowTabAdding: Writable<boolean> = persisted("allowTabAdding", true)
