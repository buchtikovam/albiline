import { isEditAllowedStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/customToast';

export function edit() {
	isEditAllowedStore.update((value) => !value);

	// TODO: implement edit disable

	if (get(isEditAllowedStore)) {
		customToast("InfoToast", "Editace byla povolena")
	} else {
		customToast("InfoToast","Editace byla zakázána")
	}

	ribbonActionStore.set(undefined);
}
