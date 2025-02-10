import type {Icon as IconType} from "lucide-svelte";



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
	id: number;
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
	ColumnFilterModelConditionString |
	ColumnFilterModelConditionNumber |
	ColumnFilterModelConditionBoolean |
	ColumnFilterModelConditionDate
)


// --- conditions ---
type ColumnFilterModelConditionString = {
	type: ColumnFilterModelConditionTypeString|null,
	value: string|null;
}

type ColumnFilterModelConditionNumber = {
	type: ColumnFilterModelConditionTypeNumber|null,
	value: number|null;
	endValue?: number|null;
}

type ColumnFilterModelConditionBoolean = {
	type: ColumnFilterModelConditionTypeBoolean|null,
	value: boolean|null,
}

type ColumnFilterModelConditionDate = {
	type: ColumnFilterModelConditionTypeDate|null,
	value: Date|null;
	endValue?: Date|null;
}
// --- conditions end ---


export type ColumnFilterModelConditionTypeString = (
	"contains" | "not-contains" |
	"equals" | "not-equals" |
	"starts-with" | "ends-with"
)


export type ColumnFilterModelConditionTypeNumber = (
	"equals" | "not-equals" |
	"more-than" | "more-or-equal" |
	"less-than" | "less-or-equal" |
	"between"
)

export type ColumnFilterModelConditionTypeBoolean = (
	"true" |
	"false"
)

export type ColumnFilterModelConditionTypeDate = (
	"equals" |
	"not-equals" |
	"before" |
	"after" |
	"between"
)


// OPERATOR SELECT
export type InputDialogOperator = {
	field: (
		ColumnFilterModelConditionTypeString |
		ColumnFilterModelConditionTypeNumber |
		ColumnFilterModelConditionTypeBoolean |
		ColumnFilterModelConditionTypeDate |
		null
	),
	label: () => string,
	icon?: typeof IconType,
	faIcon?: any,
}

