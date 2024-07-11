export type InputDialog = InputDialogItem[]

export type InputDialogItem =
	DialogString |
	DialogNumber |
	DialogDate |
	DateRange |
	CheckboxGroup |
	RadioGroup |
	DateRangeButton



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

export type DateRange = {
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


export type CheckboxGroup = {
	name: string,
	label: string,
	type: "checkbox-group"
	children: CheckboxItem[]
}

export type CheckboxItem = {
	id: string,
	label: string,
	checked: boolean
}

export type RadioGroup = {
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
