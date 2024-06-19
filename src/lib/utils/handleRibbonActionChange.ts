import { Action } from '$lib/enums/action';
import { save } from '$lib/utils/ribbon-actions/save';
import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { edit } from '$lib/utils/ribbon-actions/edit';
import { deleteItem } from '$lib/utils/ribbon-actions/deleteItem';

export function handleRibbonActionChange(action: Action) {

	// Actions running functions right away

	if (action === Action.SAVE) {
		save().then(() => ribbonActionStore.set(undefined));
	}

	if (action === Action.EDIT) {
		edit();
	}

	if (action === Action.DELETE) {
		deleteItem();
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

// TODO: delete
