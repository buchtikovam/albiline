import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';

// PERSISTENT STORES
export const columnWidthStore: Writable<Record<string, number>> = persisted('columnWidths', {});

export const columnOrderStore: Writable<string[]> = persisted('columnOrder', []);

export const pageCompactStore: Writable<'standard' | 'compact'> = persisted('rowHeight', 'standard');


// TEMPORARY STORES
export const editedDataStore: Writable<any[]> = writable([]);
