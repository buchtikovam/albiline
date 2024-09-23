import type { ColumnFilters } from '$lib/types/components/table/columnFilter';
import { writable, type Writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';
import type { Preset } from '$lib/types/components/table/presets';


// PERSISTENT STORES
export const pageCompactStore: Writable<'standard' | 'compact'> = persisted(
	'rowHeight',
	'standard'
);


// TEMPORARY STORES
export const editedDataStore: Writable<any[]> = writable([]);

export const currentColumnFiltersStore: Writable<ColumnFilters> = writable({});

export const currentSortStore: Writable<any> = writable();

export const showFulltextSearchStore: Writable<boolean> = writable(false);

export const fulltextFilterValueStore: Writable<string> = writable("");

export const selectedFilterStore: Writable<ColumnFilters> = writable({});

export const presetStore: Writable<Preset[]> = writable([]);

export const selectedPresetStore: Writable<Preset> = writable();

export const selectedRowIdStore: Writable<number|undefined> = writable(undefined);