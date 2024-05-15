import { writable } from 'svelte/store';
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"


export const ribbonStateStore = writable();

export const sidebarStateStore = writable();

export const columnWidthStore = persist(writable(), createLocalStorage(), "columnWidths")
