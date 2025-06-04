import type {IAggFuncParams} from "ag-grid-enterprise";

/*
 * AG Grid Aggregation Function to process compound objects for generic ratio calculations.
 * Each input object (from params.values) is expected to have 'dividend' and 'divisor' properties.
 * It sums these and computes the ratio
 */


export function compoundGenericRatioAggregator(params: IAggFuncParams): number | null {
	let totalDividend = 0;
	let totalDivisor = 0;

	params.values.forEach(value => {
		// 'value' is the result from the valueGetter of child rows/groups
		if (value && typeof value.dividend === 'number' && typeof value.divisor === 'number') {
			totalDividend += value.dividend;
			totalDivisor += value.divisor;
		}
	});

	if (totalDivisor === 0) return 0;

	return totalDividend / totalDivisor;
}
