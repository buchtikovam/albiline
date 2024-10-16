import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';
import { type Writable, writable } from 'svelte/store';
import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import { persisted } from 'svelte-persisted-store';

export const ribbonOpenStore: Writable<boolean> = persisted(
	'ribbonOpenStore',
	true
);

export const ribbonActionStore: Writable<RibbonActionEnum | undefined> = writable()

export const openedDialogStore: Writable<GlobalDialogOptions | undefined> = writable()

export const isEditAllowedStore: Writable<boolean> = writable(true)
