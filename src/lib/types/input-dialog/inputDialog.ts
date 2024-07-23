export type InputDialog = InputDialogItem[]

export type InputDialogItem =
	InputDialogString |
	InputDialogNumber |
	InputDialogDate |
	InputDialogDateRange |
	InputCheckboxGroup |
	InputRadioGroup |
	DateRangeButton



export type InputDialogString = {
	name: string;
	type: 'string';
	label: string;
	id: string;
	value: string;
}

export type InputDialogNumber = {
	name: string;
	type: 'number';
	label: string;
	id: string;
	value: number;
}

type InputDialogDate = {
	name: string;
	type: 'date';
	label: string;
	id: string;
	value: Date | undefined;
}

export type InputDialogDateRange = {
	name: string;
	type: 'date-range';
	startDateLabel: string;
	endDateLabel: string;
	startDateValue: Date | undefined;
	endDateValue: Date | undefined;
	presetButtons: DateRangeButtonOptions[];
}


export type DateRangeButtonOptions =
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


export type InputCheckboxGroup = {
	name: string,
	label: string,
	type: "checkbox-group"
	children: InputCheckboxItem[]
}

export type InputCheckboxItem = {
	id: string,
	label: string,
	checked: boolean
}

export type InputRadioGroup = {
	name: string,
	type: "radio-group",
	checkedValue: string,
	children: RadioItem[]

}

export type RadioItem = {
	id: string,
	label: string,
}

export type DateRangeButton = {
	name: string,
	type: "date-range-button",
	startDateValue: Date | undefined,
	endDateValue: Date | undefined,
	buttonType: DateRangeButtonOptions
}
