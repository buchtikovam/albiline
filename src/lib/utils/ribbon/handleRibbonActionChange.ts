import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { RibbonAction } from '$lib/enums/ribbonAction';
import { save } from '$lib/utils/ribbon/ribbon-actions/table-data/save';
import { edit } from '$lib/utils/ribbon/ribbon-actions/table-data/edit';
import { deleteItem } from '$lib/utils/ribbon/ribbon-actions/table-data/deleteItem';
import { removeFilters } from '$lib/utils/ribbon/ribbon-actions/filters/removeFilters';
import { goto } from '$app/navigation';


export function handleRibbonActionChange(ribbonAction: RibbonAction) {

	// Ribbon akce, které spouští rovnou funkce:

	if (ribbonAction === RibbonAction.SAVE) {
		save().then(() => ribbonActionStore.set(undefined));
	}

	if (ribbonAction === RibbonAction.EDIT) {
		edit();
	}

	if (ribbonAction === RibbonAction.DELETE) {
		deleteItem().then(() => ribbonActionStore.set(undefined));
	}

	if (ribbonAction === RibbonAction.FILTER_REMOVE) {
		removeFilters();
	}

	if (ribbonAction === RibbonAction.NEW) {
		goto("/pruvodni-list/detail").then(() => ribbonActionStore.set(undefined))
	}


	// Ribbon akce, které spouštějí dialogy:

	
	if (ribbonAction === RibbonAction.MY_FILTERS) {
		openedDialogStore.set("my-filters")
	}

	if (ribbonAction === RibbonAction.MY_PRESETS) {
		openedDialogStore.set("my-presets")
	}

	if (ribbonAction === RibbonAction.SAVE_FILTERS) {
		openedDialogStore.set("save-filters")
	}
}
