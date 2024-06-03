import { persisted } from 'svelte-persisted-store';

export const columnWidthStore = persisted('columnWidths', null);

export const columnOrderStore = persisted('columnOrder', null);

export const rowHeightStore = persisted('rowHeight', 'standard');

