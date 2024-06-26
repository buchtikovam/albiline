import type { DateValue } from '@internationalized/date';


export type InputDialog = InputDialogItem[]

export type InputDialogItem = DialogString
	| DialogNumber
	| DialogDate
	| DialogDateRange
	| DialogDateRangeButton


export type DialogString = {
	name: string;
	type: 'string';
	label: string;
	id: string;
	value: string;
}

export type DialogNumber = {
	name: string;
	type: 'number';
	label: string;
	id: string;
	value: number;
}

type DialogDate = {
	name: string;
	type: 'date';
	label: string;
	id: string;
	value: DateValue | undefined;
}

export type DialogDateRange = {
	name: string;
	type: 'date-range';
	startDateLabel: string;
	endDateLabel: string;
	startDateValue: DateValue | undefined;
	endDateValue: DateValue | undefined;
}

export type DialogDateRangeButton = {
	name: string;
	label: string;
	action: DateRangeActions
	type: 'date-range-button';
	startDateValue: DateValue | undefined;
	endDateValue: DateValue | undefined;
}

export type DateRangeActions =
	'lastYearFull' |
	'last365' |
	'thisYearFull' |
	'thisYear' |
	'lastMonthFull' |
	'thisMonthFull' |
	'thisMonth' |
	'last14' |
	'lastWeek' |
	'thisWeek'


// type DialogItemCheckbox = {
//
// }


// type DialogItemRadioButtons = {
//
// }


// type DialogDateButton = {
//
// }

