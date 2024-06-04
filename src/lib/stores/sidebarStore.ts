import { persisted } from 'svelte-persisted-store';
import type { Writable } from 'svelte/store';

export const sidebarStateStore: Writable<boolean> = persisted('sidebarState', true);

export const recentItemsStore: Writable<string[]> = persisted(
	'recentSidebarItems',
	[],
	{ storage: 'session' }
);

export const favoriteItemsStore: Writable<string[]> = persisted("favoriteSidebarItems", [])

export const activeCategoryStore: Writable<string> = persisted("activeSidebarCategory", "all")
