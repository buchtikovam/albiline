import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { Action } from '$lib/enums/action';
import { save } from '$lib/utils/ribbon/ribbon-actions/table-data/save';
import { edit } from '$lib/utils/ribbon/ribbon-actions/table-data/edit';
import { deleteItem } from '$lib/utils/ribbon/ribbon-actions/table-data/deleteItem';
import { removeFilters } from '$lib/utils/ribbon/ribbon-actions/filters/removeFilters';

export function handleRibbonActionChange(action: Action) {

	// Actions running functions right away

	if (action === Action.SAVE) {
		save().then(() => ribbonActionStore.set(undefined));
	}

	if (action === Action.EDIT) {
		edit();
	}

	if (action === Action.DELETE) {
		deleteItem().then(() => ribbonActionStore.set(undefined));
	}

	if (action === Action.FILTER_REMOVE) {
		removeFilters();
	}

	// Actions opening dialogs

	if (action === Action.NEW) {
		openedDialogStore.set("new");
	}

	if (action === Action.MY_FILTERS) {
		openedDialogStore.set("my-filters")
	}

	if (action === Action.MY_PRESETS) {
		openedDialogStore.set("my-presets")
	}

	if (action === Action.SAVE_FILTERS) {
		openedDialogStore.set("save-filters")
	}
}
