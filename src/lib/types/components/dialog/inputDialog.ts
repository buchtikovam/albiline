export type InputDialogFields = InputDialogField[];

type InputDialogField = {
	field: string;
	label: string;
	type: string|number;
}


export type InputDialogRequest = {
	fulltext: string|null;
	filters: InputDialogItem[];
}


export type InputDialogItem = {
	field: string|null;
	conditions: (InputConditionString | InputConditionNumber)[];
	operators: ("and" | "or")[]|null;
}


type InputConditionString = {
	type: InputConditionTypeString|null,
	value: string|null;
}

type InputConditionNumber = {
	type: InputConditionTyoeNumber|null,
	value: number|null;
}


type InputConditionTypeString = "starts-with" | "end-with" | "contains";

type InputConditionTyoeNumber = "higher" | "lower" | "equals";
