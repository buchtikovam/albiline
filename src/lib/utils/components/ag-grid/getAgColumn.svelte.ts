import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
import {parseStringToDate} from "$lib/utils/formatting/parseStringToDate";
import {BooleanFilter} from "$lib/utils/components/ag-grid/column-filters/booleanFilter";
import type {ValueFormatterParams} from "ag-grid-enterprise";


let table = $derived(agGridTables.value[currentPageKey.value])


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
	let filterButtons: string[] = [];

	if (!table) {
		filterButtons = [];
	} else {
		table.type === 'serverSide'
			? filterButtons = ['apply', 'reset']
			: filterButtons = []
	}
	
	if (type === 'text') {
		if (setFilter) {
			filters = [
				{
					filter: 'agTextColumnFilter',
				},
				{
					filter: 'agSetColumnFilter',
					filterParams: {
						buttons: filterButtons,
					}
				},
			]
		} else {
			filters = [
				{
					filter: 'agTextColumnFilter',
					filterParams: {
						buttons: filterButtons,
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
						buttons: filterButtons,
					}
				},
			]
		} else {
			filters = [
				{
					filter: 'agNumberColumnFilter',
					filterParams: {
						buttons: filterButtons,
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
						buttons: filterButtons,
					}
				},
			]
		} else {
			filters = [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: filterButtons,
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
						buttons: filterButtons,
					}
				},
			]
		} else {
			filters = [
				{
					filter: 'agDateColumnFilter',
					filterParams: {
						buttons: filterButtons,
					}
				},
			]
		}
	}
	
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
