import { persisted } from 'svelte-persisted-store';
import { type Writable } from 'svelte/store';
import { localStore } from '$lib/utils/local-storage/localStorage.svelte';

// @ts-expect-error Type LocalStore is an issue in components, doesn't affect runtime
export const sidebarOpen: { value: boolean } = localStore("sidebarOpen", { value: true });

// @ts-expect-error Type LocalStore is an issue in components, doesn't affect runtime
export const sidebarCategory: { value: "all" | "favorite" | "recent"} = localStore("sidebarCategory", { value: "all"});

export const recentItemsStore: Writable<string[]> = persisted(
	'recentSidebarItems',
	[],
	{ storage: 'session' }
);

export const favoriteItemsStore: Writable<string[]> = persisted(
	"favoriteSidebarItems",
	[]
)
