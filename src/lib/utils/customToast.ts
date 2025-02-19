import { toast } from 'svelte-sonner';
import Toast from '$lib/components/toast/Toast.svelte';
import type {ResponseVariant} from "$lib/types/components/response";


export function customToast(type: ResponseVariant, msg: string): void {
	// @ts-expect-error typescript error from Toast component, showed after migrating to svelte-5, but doesn't break anything
	toast.custom(Toast, {
		componentProps: {
			type: type,
			content: msg
		}
	});
}

