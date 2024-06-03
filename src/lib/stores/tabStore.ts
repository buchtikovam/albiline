import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';

export const openedTabsStore = persisted(
	'openedTabs', [
		{
			name: 'Průvodní list',
			url: '/pruvodni-list',
			closingState: "hidden",
			treeDepth: 0
		}
	]
);

export const currentActiveTabStore: Writable<string> = writable("");
