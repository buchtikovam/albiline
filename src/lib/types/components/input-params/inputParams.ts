import type { Icon as IconType } from "lucide-svelte";


export type InputParamsOptions = InputParamsSelectOptionGroup|InputParamsSelectOption;


// SELECT OPTIONS
export type InputParamsSelectOption = {
	field: string;
	label: () => string;
	type: ColumnFilterType;
	dropdownOptions?: string[];
	asyncDropdownOptions?: () => Promise<string[]>;
}


export type InputParamsSelectOptionGroup = {
	label: () => string;
	children: InputParamsSelectOption[];
}


// INPUT PARAMS
export type InputParamsType = {
	fulltext?: string|null;
	inputs?: InputParamsInput[];
	columnFilters?: ColumnFilter[];
}



export type FetchedInputParamsType = FetchedInputParam[]

export type FetchedInputParam = {
	paramId: number;
	paramName: string;
	paramValue: InputParamsType;
}



// Input params -- INPUTS
export type InputParamsInput = InputString|InputNumber|InputBoolean|InputDate|InputDateRange|InputEnum;

type InputString = {
	field: string;
	label?: () => string;
	type: "text";
	value: string,
}

type InputNumber = {
	field: string;
	type: "number";
	label?: () => string;
	value: number,
}

type InputBoolean = {
	field: string;
	label?: () => string;
	type: "boolean";
	value: boolean,
}

type InputDate = {
	field: string;
	label?: () => string;
	type: "date";
	value: string, // v domluveném datumovém formátu
}

type InputDateRange = {
	field: string;
	type: "date";
	label?: () => string;
	value: string, // v domluveném datumovém formátu
	endValue: string, // v domluveném datumovém formátu
}


type InputEnum = {
	field: string;
	type: "enum";
	label?: () => string;
	value: string,
}


// Input params -- COLUMN FILTERS
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
	FilterModelConditionText |
	FilterModelConditionNumber |
	FilterModelConditionBoolean |
	FilterModelConditionDate |
	FilterModelConditionEnum
)


// --- conditions ---
export type FilterModelConditionText = {
	type: ConditionTypesText|null,
	value: string|null;
}

export type FilterModelConditionNumber = {
	type: ConditionTypesNumber|null,
	value: number|null;
	endValue?: number|null;
}

export type FilterModelConditionBoolean = {
	type: ConditionTypesBoolean|null,
	value: boolean|null,
}

export type FilterModelConditionDate = {
	type: ConditionTypesDate|null,
	value: string|null;
	endValue?: string|null;
}

export type FilterModelConditionEnum = {
	type: ConditionTypesEnum|null,
	value: string;
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


export type ConditionTypesEnum = (
	"equals" | "not-equals"
)



// OPERATOR SELECT
export type InputParamsOperator = {
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

