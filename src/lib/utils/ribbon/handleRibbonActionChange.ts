import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import { save } from '$lib/utils/ribbon/ribbon-actions/table-data/save';
import { edit } from '$lib/utils/ribbon/ribbon-actions/table-data/edit';
import { deleteItem } from '$lib/utils/ribbon/ribbon-actions/table-data/deleteItem';
import { removeFilters } from '$lib/utils/ribbon/ribbon-actions/filters/removeFilters';
import { goto } from '$app/navigation';
import { filterQuick } from './ribbon-actions/filters/filterQuick';


export function handleRibbonActionChange(ribbonAction: RibbonActionEnum) {

	// Ribbon akce, které spouští rovnou funkce:

	// if (ribbonAction === RibbonActionEnum.SAVE) {
	// 	save().then(() => ribbonActionStore.set(undefined));
	// }

	if (ribbonAction === RibbonActionEnum.EDIT) {
		edit();
	}

	// if (ribbonAction === RibbonActionEnum.DELETE) {
	// 	deleteItem().then(() => ribbonActionStore.set(undefined));
	// }

	if (ribbonAction === RibbonActionEnum.FILTER_REMOVE) {
		removeFilters();
	}

	// if (ribbonAction === RibbonActionEnum.NEW) {
	// 	goto("/pruvodni-list/detail").then(() => ribbonActionStore.set(undefined))
	// }

	if (ribbonAction === RibbonActionEnum.FILTER_QUICK) {
		filterQuick();	
	}


	// Ribbon akce, které spouštějí dialogy:

	
	if (ribbonAction === RibbonActionEnum.MY_FILTERS) {
		openedDialogStore.set("my-filters")
	}

	if (ribbonAction === RibbonActionEnum.MY_PRESETS) {
		openedDialogStore.set("my-presets")
	}

	if (ribbonAction === RibbonActionEnum.SAVE_FILTERS) {
		openedDialogStore.set("save-filters")
	}

	if (ribbonAction === RibbonActionEnum.SAVE_PRESET) {
		openedDialogStore.set("save-preset")
	}
}
