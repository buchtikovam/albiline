import type {ValueFormatterParams} from "ag-grid-enterprise";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";

export function getSumAggObj() {
	return {
		aggFunc: "sum",
		valueFormatter: (params: ValueFormatterParams) => {
			return formatNumberToCzech(params.value)
		}
	}
}
