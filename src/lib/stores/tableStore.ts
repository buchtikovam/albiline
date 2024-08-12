import type { ColumnFilters } from '$lib/types/table/columnFilter';
import { writable, type Writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';


// PERSISTENT STORES
export const columnWidthStore: Writable<Record<string, number>> = persisted(
	'columnWidths',
	{}
);

export const columnOrderStore: Writable<string[]> = persisted(
	'columnOrder',
	[]
);

export const pageCompactStore: Writable<'standard' | 'compact'> = persisted(
	'rowHeight',
	'standard'
);


// TEMPORARY STORES
export const editedDataStore: Writable<any[]> = writable([]);

export const currentColumnFiltersStore: Writable<ColumnFilters> = writable({})

export const currentSortStore: Writable<any> = writable()

export const showFulltextSearchStore: Writable<boolean> = writable(false)

export const fulltextFilterValueStore: Writable<string> = writable("")