import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';

export const sidebarOpenStore: Writable<boolean> = persisted("sidebarOpenStore", true);

export const recentItemsStore: Writable<string[]> = persisted(
	'recentSidebarItems',
	[],
	{ storage: 'session' }
);

export const favoriteItemsStore: Writable<string[]> = persisted(
	"favoriteSidebarItems",
	[]
)

export const activeCategoryStore: Writable<string> = writable("all")
