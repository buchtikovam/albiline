import type { InputDialog } from '$lib/types/inputDialog';

export const params: InputDialog = [
	{
		name: "String",
		type: "string",
		label: "Parametr string",
		id: "param1",
		value: "test"
	},

	{
		name: "Number",
		type: "number",
		label: "Parametr číslo",
		id: "param2",
		value: 14
	},

	{
		name: "Date",
		type: "date",
		label: "Datum",
		id: "date",
		value: undefined,
	},

	{
		name: "DateRange",
		type: "date-range",
		startDateLabel: "Začátek",
		endDateLabel: "Konec",
		startDateValue: undefined,
		endDateValue: undefined
	},
]
