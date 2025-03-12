import {BooleanFilter} from "$lib/utils/components/ag-grid/column-filters/booleanFilter";
import type {ValueFormatterParams} from "ag-grid-enterprise";
import {parseStringToDate} from "$lib/utils/formatting/parseStringToDate";

export function getAgColumn(
	field: string,
	type: "number"|"text"|"date"|"boolean",
	width: number,
	editable: boolean,
	hidden: boolean,
	setFilter: boolean,
	cellClass: string[],
	custom?: Record<string, any>,
) {
	let filters: any[] = [];

	if (type === 'text') {
		if (setFilter) {
			filters = [
				{
					filter: 'agTextColumnFilter',
				},
				{
					filter: 'agSetColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		} else {
			filters = [
				{
					filter: 'agTextColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	}

	if (type === 'number') {
		if (setFilter) {
			filters = [
				{
					filter: 'agNumberColumnFilter',
				},
				{
					filter: 'agSetColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		} else {
			filters = [
				{
					filter: 'agNumberColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	}

	if (type === 'boolean') {
		if (setFilter) {
			filters = [
				{
					filter: BooleanFilter,
				},
				{
					filter: 'agSetColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		} else {
			filters = [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	}
	
	if (type === 'date') {
		if (setFilter) {
			filters = [
				{
					filter: 'agDateColumnFilter',
				},
				{
					filter: 'agSetColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		} else {
			filters = [
				{
					filter: 'agDateColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}	}
	
	return {
		field: field,
		cellDataType: type,
		editable: editable,
		hide: hidden,
		cellClass: cellClass,
		width: width,
		valueFormatter: (params: ValueFormatterParams) => {
			if (type === "date") {
				if (params.value === null) {
					return "";
				}
				return parseStringToDate(params.value);
			}

			return params.value

		},
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: filters,
		},
		...custom,
	}
}
