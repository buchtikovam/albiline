import type {IAggFuncParams} from "ag-grid-enterprise";

export function totalAvgDivisionPercentageAggregator(params: IAggFuncParams): number | null {
	let totalCurrentSale = 0;
	let totalCurrentQuantity = 0;
	let totalPreviousSale = 0;
	let totalPreviousQuantity = 0;

	params.values.forEach((value) => {
		if (value) {
			if (typeof value.currentPeriodSale === 'number' && isFinite(value.currentPeriodSale)) totalCurrentSale += value.currentPeriodSale;
			if (typeof value.currentPeriodQuantity === 'number' && isFinite(value.currentPeriodQuantity)) totalCurrentQuantity += value.currentPeriodQuantity;
			if (typeof value.previousPeriodSale === 'number' && isFinite(value.previousPeriodSale)) totalPreviousSale += value.previousPeriodSale;
			if (typeof value.previousPeriodQuantity === 'number' && isFinite(value.previousPeriodQuantity)) totalPreviousQuantity += value.previousPeriodQuantity;
		}
	});

	const overall_avg_item_ay = totalCurrentQuantity > 0 ? totalCurrentSale / totalCurrentQuantity : 0;
	const overall_avg_item_ly = totalPreviousQuantity > 0 ? totalPreviousSale / totalPreviousQuantity : 0;

	let result: number | null;

	if (overall_avg_item_ly <= 0 && overall_avg_item_ay > 0) {
		result = 1;
	}

	if (overall_avg_item_ly >= 0 && overall_avg_item_ay < 0) {
		result = -1;
	} else if (overall_avg_item_ly === 0 && overall_avg_item_ay === 0) {
		result = 0;
	} else {
		if (overall_avg_item_ly === 0) {
			result = null;
		} else {
			result = (overall_avg_item_ay / overall_avg_item_ly) - 1;
		}
	}

	return result;
}
