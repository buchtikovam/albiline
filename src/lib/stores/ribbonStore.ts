import type { RibbonDialogOptions } from '$lib/types/ribbon/ribbonDialogOptions';
import { type Writable, writable } from 'svelte/store';
import type { RibbonAction } from '$lib/enums/ribbonAction';
import { persisted } from 'svelte-persisted-store';

export const ribbonStateStore: Writable<boolean> = persisted(
	'ribbonState',
	true
);

export const ribbonActionStore: Writable<RibbonAction | undefined> = writable()

export const openedDialogStore: Writable<RibbonDialogOptions | undefined> = writable()

export const isEditAllowedStore: Writable<boolean> = writable(true)
