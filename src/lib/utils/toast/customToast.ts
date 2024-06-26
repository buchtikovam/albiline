import { toast } from 'svelte-sonner';
import Toast from '$lib/components/toast/Toast.svelte';
import type { ToastVariant } from '$lib/types/toast';

export function customToast(type: ToastVariant, msg: string): void {
	toast.custom(Toast, {
		componentProps: {
			type: type,
			content: msg
		}
	});
}
