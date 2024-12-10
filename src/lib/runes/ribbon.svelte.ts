import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';
import { type Writable, writable } from 'svelte/store';
import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
// import { persisted } from 'svelte-persisted-store';
import { localStore, type LocalStore } from '$lib/utils/local-storage/localStorage.svelte';

export const ribbonOpen: LocalStore<boolean> = localStore("ribbonOpen", false)






export const ribbonActionStore: Writable<RibbonActionEnum | undefined> = writable()

export const openedDialogStore: Writable<GlobalDialogOptions | undefined> = writable()

export const isEditAllowedStore: Writable<boolean> = writable(false)
