import type {ICellRendererParams} from "ag-grid-community";
import {formatPercentage} from "$lib/utils/general/formatPercentage";

export function getTotalAvgDivisionPercentageAggObj() {
	return {
		aggFunc: 'totalAvgDivisionPercentageAgg',
		cellRenderer: (params: ICellRendererParams) => {
			if (params.node && params.node.group) {
				return formatPercentage(params.value, 0);
			}

			if (params.value && typeof params.value.originalValue !== 'undefined') {
				return formatPercentage(params.value.originalValue, 0);
			}

			return '';
		},
	}
}
