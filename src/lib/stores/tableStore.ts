import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';
import type { StoredFilters } from '$lib/types/table/filter';
import type { TableColumn, TableRows } from '$lib/types/table/table';


// PERSISTENT STORES
export const columnWidthStore: Writable<Record<string, number>> = persisted('columnWidths', {});

export const columnOrderStore: Writable<string[]> = persisted('columnOrder', []);

export const pageCompactStore: Writable<'standard' | 'compact'> = persisted('rowHeight', 'standard');


// TEMPORARY STORES
export const editedDataStore: Writable<any[]> = writable([]);

export const currentFiltersStore: Writable<StoredFilters> = writable({test: { value: '', colFilter: 'starts-with' }})

export const selectedRowsStore: Writable<Record<number, boolean>|undefined> = writable(undefined)

export const rowDataStore: Writable<TableRows> = writable()

export const columnDataStore: Writable<TableColumn[]> = writable()

export const showFulltextSearchStore: Writable<boolean> = writable(false)

export const filterValueStore: Writable<string> = writable("")
