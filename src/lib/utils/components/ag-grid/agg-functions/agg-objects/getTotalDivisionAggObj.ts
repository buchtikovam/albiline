import type {ICellRendererParams} from "ag-grid-community";
import {formatPercentage} from "$lib/utils/general/formatPercentage";

export function getTotalDivisionAggObj() {
	return {
		aggFunc: 'totalDivisionAgg',
		cellRenderer: (params: ICellRendererParams) => {
			if (params.node && params.node.group) {
				return formatPercentage(params.value, 0);
			}

			if (params.value && typeof params.value.originalDiffValue !== 'undefined') {
				return formatPercentage(params.value.originalDiffValue, 0);
			}

			return '';
		},
	}
}
