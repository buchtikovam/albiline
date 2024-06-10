import { persisted } from 'svelte-persisted-store';
import { writable, type Writable } from 'svelte/store';

export const columnWidthStore: Writable<Record<string, number>> = persisted('columnWidths', {});

export const columnOrderStore: Writable<string[]> = persisted('columnOrder', []);

export const pageCompactStore: Writable<'standard' | 'compact'> = persisted('rowHeight', 'standard');

export const columnFilterStore: Writable<string> = writable()
