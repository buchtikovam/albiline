export type ToastVariant = 'InfoToast' | 'Warning' | 'Critical' | 'Success';

export type Toast = {
	type: ToastVariant,
	content: string
}
