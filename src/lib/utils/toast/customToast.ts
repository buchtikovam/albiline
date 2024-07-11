import { toast } from 'svelte-sonner';
import type { ToastVariant } from '$lib/types/toast';
import Toast from '$lib/components/toast/Toast.svelte';


export function customToast(type: ToastVariant, msg: string): void {
	toast.custom(Toast, {
		componentProps: {
			type: type,
			content: msg
		}
	});
}
