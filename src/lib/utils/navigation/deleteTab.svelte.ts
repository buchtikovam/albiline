import { openedTabs } from '$lib/runes/navigation.svelte';
import { page } from '$app/state';
import { goto } from '$app/navigation';
import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
import {localizeHref} from "$lib/paraglide/runtime";
import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";


export function deleteTab(tab: HeaderTab) {
	openedTabs.value.forEach((storedTab) => {
		if (storedTab.field === tab.field) {
			const index = openedTabs.value.indexOf(tab);
			openedTabs.value.splice(openedTabs.value.indexOf(tab), 1);

			let table = agGridTables.value[currentPageKey.value];


			// after tab was removed, redirect on available tab
			if (page.url.pathname === localizeHref(tab.url)) {
				if (openedTabs.value.length === 0) {
					goto(localizeHref("/")).then(() => {
						if (table) {
							table.filtersToSave = {};
							table.presetToSave = [];
							table.fulltextFilterValue = "";
							table.selectedRows = [];
							table.selectionState = { selectAll: false, toggledNodes: [] };
							table.sortState = [];
							table.areInputParamsLoading = false;
							table.hasInputParams = false;
							table.loadedInputParams = {};
						}
					});
				}

				if (openedTabs.value[index]) { // was spliced, so no need to increment index
					goto(localizeHref(openedTabs.value[index].url)).then(() => {
						if (table) {
							table.filtersToSave = {};
							table.presetToSave = [];
							table.fulltextFilterValue = "";
							table.selectedRows = [];
							table.selectionState = { selectAll: false, toggledNodes: [] };
							table.sortState = [];
							table.areInputParamsLoading = false;
							table.hasInputParams = false;
							table.loadedInputParams = {};
						}
					});

				}

				if (openedTabs.value[index - 1]) {
					goto(localizeHref(openedTabs.value[index-1].url)).then(() => {
						if (table) {
							table.filtersToSave = {};
							table.presetToSave = [];
							table.fulltextFilterValue = "";
							table.selectedRows = [];
							table.selectionState = { selectAll: false, toggledNodes: [] };
							table.sortState = [];
							table.areInputParamsLoading = false;
							table.hasInputParams = false;
							table.loadedInputParams = {};
						}
					});
				}
			}
		}
	});
}
