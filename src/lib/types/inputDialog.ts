import type { DateValue } from '@internationalized/date';


export type InputDialog = InputDialogItem[]

export type InputDialogItem = DialogItemString
	| DialogItemNumber
	| DialogItemDate
	| DialogItemDateRange


export type DialogItemString = {
	name: string;
	type: 'string';
	label: string;
	id: string;
	value: string;
}

export type DialogItemNumber = {
	name: string;
	type: 'number';
	label: string;
	id: string;
	value: number;
}

type DialogItemDate = {
	name: string;
	type: 'date';
	label: string;
	id: string;
	value: DateValue | undefined;
}

export type DialogItemDateRange = {
	name: string;
	type: 'date-range';
	startDateLabel: string;
	endDateLabel: string;
	startDateValue: DateValue | undefined;
	endDateValue: DateValue | undefined;
}


// type DialogItemCheckbox = {
//
// }


// type DialogItemRadioButtons = {
//
// }

// type DialogItemPresetDateButton = {
//
// }
