import type { Icon as IconType } from "lucide-svelte";



// SELECT OPTIONS
export type InputDialogSelectOption = {
	field: string;
	label: () => string;
	type: "text" | "number" | "boolean" | "enum" | "date";
}



// INPUT DIALOG
export type InputDialogType = {
	fulltext?: string|null;
	inputs?: InputDialogInput[];
	columnFilters?: ColumnFilter[];
}



// Input dialog -- INPUTS
type InputDialogInput = {
	name: string;
	value: any
}



// Input dialog -- COLUMN FILTERS
export type ColumnFilter = {
	id?: number;
	columnName: string|null;
	type: ColumnFilterType;
	filterModel: ColumnFilterModel;
}

export type ColumnFilterType = (
	"text" |
	"number" |
	"boolean" |
	"enum" |
	"date"
)


type ColumnFilterModel = {
	operator: "OR" | "AND" | null;
	conditions: ColumnFilterModelCondition[];
};



export type ColumnFilterModelCondition = (
	FilterModelConditionText |
	FilterModelConditionNumber |
	FilterModelConditionBoolean |
	FilterModelConditionDate
)


// --- conditions ---
type FilterModelConditionText = {
	type: ConditionTypesText|null,
	value: string|null;
}

export type FilterModelConditionNumber = {
	type: ConditionTypesNumber|null,
	value: number|null;
	endValue?: number|null;
}

type FilterModelConditionBoolean = {
	type: ConditionTypesBoolean|null,
	value: boolean|null,
}

type FilterModelConditionDate = {
	type: ConditionTypesDate|null,
	value: Date|null;
	endValue?: Date|null;
}
// --- conditions end ---


export type ConditionTypesText = (
	"contains" | "not-contains" |
	"equals" | "not-equals" |
	"starts-with" | "ends-with"
)


export type ConditionTypesNumber = (
	"equals" | "not-equals" |
	"more-than" | "more-or-equal" |
	"less-than" | "less-or-equal" |
	"between"
)

export type ConditionTypesBoolean = (
	"true" |
	"false"
)

export type ConditionTypesDate = (
	"equals" |
	"not-equals" |
	"before" |
	"after" |
	"between"
)





// OPERATOR SELECT
export type InputDialogOperator = {
	field: (
		ConditionTypesText |
		ConditionTypesNumber |
		ConditionTypesBoolean |
		ConditionTypesDate |
		null
	),
	label: () => string,
	icon?: typeof IconType,
	faIcon?: any,
}

