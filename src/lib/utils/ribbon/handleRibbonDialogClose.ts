import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';


export function handleRibbonDialogClose() {
	setTimeout(() => {
		openedDialogStore.set(undefined)
		ribbonActionStore.set(undefined)
	}, 200)
}
