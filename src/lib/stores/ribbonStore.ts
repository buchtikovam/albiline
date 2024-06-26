import { persisted } from 'svelte-persisted-store';
import { type Writable, writable } from 'svelte/store';
import type { Action } from '$lib/enums/action';
import type { RibbonDialog } from '$lib/types/ribbon/ribbonDialog';

export const ribbonStateStore: Writable<boolean> = persisted('ribbonState', true);

export const ribbonActionStore: Writable<Action | undefined> = writable()

export const openedDialogStore: Writable<RibbonDialog | undefined> = writable()

export const isEditAllowedStore: Writable<boolean> = writable(true)
