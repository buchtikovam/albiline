import { Action } from '$lib/enums/action';
import { save } from '$lib/utils/ribbon-actions/save';
import { ribbonActionStore } from '$lib/stores/ribbonStore';

export function handleRibbonActionChange(action: Action) {
	console.log(action);

	if (action === Action.SAVE) {
		save().then(() => ribbonActionStore.set(undefined));
	}
}
