import type { InputDialogItem } from '$lib/types/inputDialog';

export const params: InputDialogItem[] = [
	{
		type: "string",
		label: "Parametr string",
		id: "param1",
		value: ""
	},

	{
		type: "date",
		label: "Datum",
		id: "date",
	},

	{
		type: "number",
		label: "Parametr číslo",
		id: "param2",
		value: ""
	},

]
