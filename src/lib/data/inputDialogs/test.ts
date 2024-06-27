import type { InputDialog } from '$lib/types/input-dialog/inputDialog';


export const params: InputDialog = [
	// STRING
	{
		name: "String",
		type: "string",
		label: "Parametr string",
		id: "param1",
		value: "test"
	},

	// NUMBER
	{
		name: "Number",
		type: "number",
		label: "Parametr číslo",
		id: "param2",
		value: 14
	},

	// // DATE
	// {
	// 	name: "Date",
	// 	type: "date",
	// 	label: "Datum",
	// 	id: "date",
	// 	value: undefined,
	// },

	// DATE RANGE
	{
		name: "DateRange",
		type: "date-range",
		startDateLabel: "Začátek",
		endDateLabel: "Konec",
		startDateValue: undefined,
		endDateValue: undefined
	},

	// // PRESET DATE RANGE BTN
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "365",
	// 	action: "last365",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn",
	// 	label: String(new Date().getFullYear() - 1),
	// 	action: "lastYearFull",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: String(new Date().getFullYear()),
	// 	action: "thisYearFull",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Tento rok",
	// 	action: "thisYear",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Minulý měsíc",
	// 	action: "lastMonthFull",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Celý měsíc",
	// 	action: "thisMonthFull",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Tento měsíc",
	// 	action: "thisMonth",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Dva týdny",
	// 	action: "last14",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Minulý týden",
	// 	action: "lastWeek",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
	//
	// {
	// 	name: "DatePresetBtn2",
	// 	label: "Tento týden",
	// 	action: "thisWeek",
	// 	type: "date-range-button",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined
	// },
]
