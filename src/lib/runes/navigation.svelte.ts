import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
import {SessionStore, sessionStore} from '$lib/utils/browser-storage/sessionStorage.svelte';


export const openedTabs: SessionStore<HeaderTab[]> = sessionStore("openedTabs", []);

export const disableNavigation: { value: boolean } = $state({ value: false });

export const disablePageTabs: { value: boolean } = $state({ value: false });

export const activePageTab: { value: string } = $state({ value: "" })
