import { persisted } from 'svelte-persisted-store';
import { type Writable, writable } from 'svelte/store';

export const ribbonStateStore = persisted("ribbonState", true)

export const sidebarStateStore = persisted("sidebarState", true)

export const columnWidthStore = persisted("columnWidths", null)

export const columnOrderStore = persisted("columnOrder", null)

export const openAccordionsStore: Writable<string[]> = writable([]);
