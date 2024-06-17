import { Action } from '$lib/enums/action';
import { save } from '$lib/utils/ribbon-actions/save';
import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { edit } from '$lib/utils/ribbon-actions/edit';

export function handleRibbonActionChange(action: Action) {
	if (action === Action.SAVE) {
		save().then(() => ribbonActionStore.set(undefined));
	}

	if (action === Action.EDIT) {
		edit();
	}

	if (action === Action.NEW) {
		openedDialogStore.set("new");
	}

	if (action === Action.MY_FILTERS) {
		openedDialogStore.set("my-filters")
	}

	if (action === Action.MY_PRESETS) {
		openedDialogStore.set("my-presets")
	}
}

// TODO: delete, edit
