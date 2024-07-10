export type InputDialog = InputDialogItem[]

export type InputDialogItem = DialogString
	| DialogNumber
	| DialogDate
	| DialogDateRange
	| DialogCheckboxGroup
	| DialogRadioGroup
	| DateRangeButton


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
	value: Date | undefined;
}

export type DialogDateRange = {
	name: string;
	type: 'date-range';
	startDateLabel: string;
	endDateLabel: string;
	startDateValue: Date | undefined;
	endDateValue: Date | undefined;
	presetButtons: DateRangeButtons[];
}


export type DateRangeButtons =
	'lastYear' |
	'last365' |
	'thisYearFull' |
	'thisYear' |
	'lastMonthFull' |
	'thisMonthFull' |
	'thisMonth' |
	'last14' |
	'lastWeek' |
	'thisWeek'


export type DialogCheckboxGroup = {
	name: string,
	label: string,
	type: "checkbox-group"
	children: DialogCheckbox[]
}

export type DialogCheckbox = {
	id: string,
	label: string,
	checked: boolean
}

export type DialogRadioGroup = {
	name: string,
	type: "radio-group",
	checkedValue: string,
	children: DialogRadioItem[]

}

export type DialogRadioItem = {
	id: string,
	label: string,
}

export type DateRangeButton = {
	name: string,
	type: "date-range-button",
	startDateValue: Date | undefined,
	endDateValue: Date | undefined,
	buttonType: DateRangeButtons
}
