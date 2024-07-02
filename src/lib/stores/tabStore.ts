import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';
import type { Tab } from '$lib/types/sidebar/sidebar';

export const openedTabsStore: Writable<Tab[]> = persisted("openedTabs", []);

export const currentActiveTabStore: Writable<string> = writable("");

export const allowTabAdding: Writable<boolean> = persisted("allowTabAdding", true)
