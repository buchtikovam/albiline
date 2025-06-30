import type {IAggFuncParams} from "ag-grid-enterprise";

/**
 * Aggregation function that processes compound objects.
 * Each object is expected to have 'dividend' and 'divisor' properties representing
 * values from the child level (either raw row data or results from a lower aggregation level).
 * It sums these 'dividend' and 'divisor' values and then computes the percentage difference.
 */

export function totalDivisionPercentageAggregator(params: IAggFuncParams): number | null {
	let totalDividend = 0;
	let totalDivisor = 0;

	params.values.forEach(value => {
		if (
			value &&
			typeof value.dividend === 'number' &&
			typeof value.divisor === 'number'
		) {
			totalDividend += value.dividend;
			totalDivisor += value.divisor;
		}
	});

	if (totalDivisor <= 0 && totalDividend > 0) return 1;
	if (totalDivisor >= 0 && totalDividend < 0) return -1;
	if (totalDivisor === 0 && totalDividend === 0) return 0;

	return totalDividend / totalDivisor - 1;
}
