import { isEditAllowedStore, ribbonActionStore } from '$lib/stores/ribbonStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';

export function edit() {
	isEditAllowedStore.update((value) => !value);

	if (get(isEditAllowedStore)) {
		customToast("InfoToast", "Editace byla povolena")
	} else {
		customToast("InfoToast","Editace byla zakázána")
	}

	ribbonActionStore.set(undefined);
}
