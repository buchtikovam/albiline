export type ResponseVariant =
	'InfoBox' |
	'Warning' |
	'Critical' |
	'Success' |
	'InfoToast' |
	'WarningToast' |
	'CriticalToast' |
	'SuccessToast';


export type ResponseDialogMessage = {
	title: string,
	content: string,
	type: ResponseVariant
}
