import {BooleanFilter} from "$lib/utils/components/ag-grid/column-filters/booleanFilter";

export function getAgColumn(
	field: string,
	type: "number"|"text"|"date"|"boolean",
	width: number,
	editable: boolean,
	hidden: boolean,
) {
	let filter: string|typeof BooleanFilter = 'agTextColumnFilter';

	if (type === "number") filter = 'agNumberColumnFilter';
	if (type === "date") filter = 'agDateColumnFilter';
	if (type === "boolean") filter = BooleanFilter;

	return {
		field: field,
		cellDataType: type,
		editable: editable,
		hide: hidden,
		width: width,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: filter,
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			],
		},
	}
}
