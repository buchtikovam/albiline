import { isEditAllowedStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { toastStore } from '$lib/stores/toastStore';
import { get } from 'svelte/store';

export function edit() {
	isEditAllowedStore.update((value) => !value)

	if (get(isEditAllowedStore)) {
		toastStore.set([{
			type: "InfoToast",
			content: "Editace byla povolena."
		}])
	} else {
		toastStore.set([{
			type: "InfoToast",
			content: "Editace byla zakázána."
		}])
	}

	ribbonActionStore.set(undefined)
}
