import { writable } from 'svelte/store';
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
// TODO: Přidat https://www.npmjs.com/package/svelte-persisted-store

export const ribbonStateStore = writable();

export const sidebarStateStore = writable();

export const columnWidthStore = persist(writable(), createLocalStorage(), "columnWidths")
