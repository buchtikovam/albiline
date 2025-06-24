import { LocalStore, localStore } from '$lib/utils/storage/localStorage.svelte';
import { SessionStore, sessionStore } from '$lib/utils/storage/sessionStorage.svelte';

export const sidebarOpen: LocalStore<boolean> = localStore("sidebarOpen", true);

export const sidebarCategory: LocalStore<'all' | "favorite" | "recent"> = localStore("sidebarCategory", "all");

export const recentItems: SessionStore<string[]> = sessionStore('recentSidebarItems', []);

export const openedSidebarItems: SessionStore<string[]> = sessionStore("openedSidebarItems", []);
