import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import { localStore, type LocalStore } from '$lib/utils/local-storage/localStorage.svelte';
import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';


export const ribbonOpen: LocalStore<boolean> = localStore("ribbonOpen", false)

export const ribbonAction: { value: RibbonActionEnum } = $state({ value: RibbonActionEnum.UNKNOWN})

export const openedDialog: { value: GlobalDialogOptions } = $state({ value: "empty" })

export const isEditAllowed: { value: boolean } = $state({ value: false })
