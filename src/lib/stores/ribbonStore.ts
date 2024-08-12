import type { RibbonDialogOptions } from '$lib/types/ribbon/ribbonDialogOptions';
import { type Writable, writable } from 'svelte/store';
import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import { persisted } from 'svelte-persisted-store';

export const ribbonStateStore: Writable<boolean> = persisted(
	'ribbonState',
	true
);

export const ribbonActionStore: Writable<RibbonActionEnum | undefined> = writable()

export const openedDialogStore: Writable<RibbonDialogOptions | undefined> = writable()

export const isEditAllowedStore: Writable<boolean> = writable(true)
