// SELECT OPTIONS
export type InputDialogSelectOption = {
	field: string;
	label: () => string;
	type: ColumnFilterType;
}


// INPUT DIALOG
export type InputDialogType = {
	fulltext?: string|null;
	inputs?: InputDialogInput[];
	columnFilters?: ColumnFilter[];
}


// INPUTS
type InputDialogInput = {
	name: string;
	value: any
}


// COLUMN FILTERS
export type ColumnFilter = {
	id: number;
	columnName: string|null;
	type: ColumnFilterType;
	filterModel: ColumnFilterModelType;
}

type ColumnFilterType = "text" | "number" | "boolean" | "enum" | "date";



type ColumnFilterModelType = {
	operator: "OR" | "AND" | null;
	conditions: ColumnFilterModelCondition[];
};



export type ColumnFilterModelCondition = ColumnFilterModelConditionString | ColumnFilterModelConditionNumber;

type ColumnFilterModelConditionString = {
	type: ColumnFilterModelConditionTypesString|null,
	value: string|null;
}

type ColumnFilterModelConditionNumber = {
	type: ColumnFilterModelConditionTypesNumber,
	value: number|null;
}



export type ColumnFilterModelConditionTypesString =
	"contains" | "not-contains" |
	"equals" | "not-equals" |
	"starts-with" | "ends-with" |
	"empty" | "not-empty";


export type ColumnFilterModelConditionTypesNumber =
	"equals" | "not-equals" |
	"more" | "more-or-equal" |
	"less" | "less-or-equal" |
	"between" | "empty" | "not-empty";
