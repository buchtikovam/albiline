import type { ColumnFilters } from '$lib/types/components/table/columnFilter';
import { writable, type Writable } from 'svelte/store';
import type { Preset } from '$lib/types/components/table/presets';

export const tableRowDataStore: Writable<any[]> = writable([]);


export const editedDataStore: Writable<any[]> = writable([]);

export const deletedColumnsStore: Writable<any[]> = writable([]);

export const setColDefToDefault: Writable<boolean> = writable(false)

export const defaultColDef = writable([])



export const currentColumnFiltersStore: Writable<ColumnFilters> = writable({});

export const currentSortStore: Writable<any> = writable();

export const showFulltextSearchStore: Writable<boolean> = writable(false);

export const fulltextFilterValueStore: Writable<string> = writable("");

export const selectedFilterStore: Writable<ColumnFilters> = writable({});

export const presetStore: Writable<Preset[]> = writable([]);

export const selectedPresetStore: Writable<Preset> = writable();

export const selectedRowIdStore: Writable<number|undefined> = writable(undefined);