import { persisted } from 'svelte-persisted-store';
import { type Writable, writable } from 'svelte/store';

export const ribbonStateStore = persisted('ribbonState', true);

export const sidebarStateStore = persisted('sidebarState', true);

export const columnWidthStore = persisted('columnWidths', null);

export const columnOrderStore = persisted('columnOrder', null);

export const rowHeightStore = persisted('rowHeight', 'standard');

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
