import type { InputDialog } from '$lib/types/components/input-dialog/inputDialog';


export const params: InputDialog = [
	// STRING
	{
		name: "String",
		type: "string",
		label: "Parametr string",
		id: "param1",
		value: "test"
	},
	//
	// // NUMBER
	{
		name: "Number",
		type: "number",
		label: "Parametr číslo",
		id: "param2",
		value: 14
	},

	// DATE
	{
		name: "Date",
		type: "date",
		label: "Datum",
		id: "date",
		value: undefined,
	},

	// DATE RANGE
	// {
	// 	name: "DateRange",
	// 	type: "date-range",
	// 	startDateLabel: "Začátek",
	// 	endDateLabel: "Konec",
	// 	startDateValue: undefined,
	// 	endDateValue: undefined,
	// 	presetButtons: ['lastYear']
	// },

	// DATE RANGE PRESET BTN
	{
		name: "DateRangeButton",
		type: "date-range-button",
		startDateValue: undefined,
		endDateValue: undefined,
		buttonType: 'lastYear'
	},

	// CHECKBOX GROUP
	{
		name: 'checkboxGroup',
		label: 'Checkbox skupina',
		type: 'checkbox-group',
		children: [
			{
				id: 'checkbox1',
				label: 'Checkbox 1',
				checked: false
			},
			{
				id: 'checkbox2',
				label: 'Checkbox 2',
				checked: false
			},
			{
				id: 'checkbox3',
				label: 'Checkbox 3',
				checked: false
			}
		]
	},


	// 	RADIO GROUP
	{
		name: "radioGroup",
		checkedValue: "radio1",
		type: "radio-group",
		children: [
			{
				id: "radio1",
				label: "Radio item 1"
			},
			{
				id: "radio2",
				label: "Radio item 2"
			},
			{
				id: "radio3",
				label: "Radio item 3"
			}
		]
	}
]
