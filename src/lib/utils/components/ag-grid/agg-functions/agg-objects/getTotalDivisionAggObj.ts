import type {ICellRendererParams} from "ag-grid-community";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";

export function getTotalDivisionAggObj(isnumber?: boolean) {
	return {
		aggFunc: 'totalDivisionAgg',
		cellRenderer: (params: ICellRendererParams) => {
			if (isnumber) {
				if (params.node && params.node.group) {
					return formatNumberToCzech(params.value)
				}

				if (params.value && typeof params.value.originalValue !== 'undefined') {
					return formatNumberToCzech(params.value.originalValue)
				}

			}

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
