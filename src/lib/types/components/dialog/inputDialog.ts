export type InputDialogFields = InputDialogField[];

export type InputDialogField = {
	field: string;
	label: string;
	type: InputDialogType;
}

export type InputDialogType = string|number;


export type InputDialogRequest = {
	fulltext: string|null;
	filters: InputDialogItem[];
}


export type InputDialogItem = {
	field: string|null;
	type: InputDialogType;
	filter: InputDialogCondition;
}


type InputDialogCondition = InputConditionString | InputConditionNumber;

type InputConditionString = {
	operator: InputConditionTypeString|null,
	value: string|null|string[];
}

type InputConditionNumber = {
	operator: InputConditionTypeNumber|null,
	value: number|null|number[];
}


export type InputConditionTypeString =
	"contains" |
	"not-contains" |
	"equals" |
	"not-equals" |
	"starts-with" |
	"ends-with" |
	"empty" |
	"not-empty";


export type InputConditionTypeNumber =
	"equals" |
	"not-equals" |
	"more" |
	"more-or-equal" |
	"less" |
	"less-or-equal" |
	"one-of" |
	"between" |
	"empty" |
	"not-empty";
