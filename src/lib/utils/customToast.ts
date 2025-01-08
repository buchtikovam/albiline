import { toast } from 'svelte-sonner';
import type { ToastVariant } from '$lib/types/components/toast';
import Toast from '$lib/components/toast/Toast.svelte';


export function customToast(type: ToastVariant, msg: string): void {
	// @ts-expect-error typescript error from Toast component, showed after migrating to svelte-5, but doesn't break anything
	toast.custom(Toast, {
		componentProps: {
			type: type,
			content: msg
		}
	});
}

