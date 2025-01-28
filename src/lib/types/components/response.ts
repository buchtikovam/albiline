export type ResponseVariant =
	'InfoToast' |
	'WarningToast' |
	'InfoBox' |
	'Warning' |
	'Critical' |
	'Success';


export type ResponseDialogMessage = {
	title: string,
	content: string,
	type: ResponseVariant
}
