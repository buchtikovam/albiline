import type {InputParamsType} from "$lib/types/components/input-params/inputParams";


export function cleanUpColumnFilters(inputParams: InputParamsType): InputParamsType {
	if (!inputParams.columnFilters) {
		return inputParams;
	}

	// const isValidCondition = (condition: ColumnFilterModelCondition, filterType: ColumnFilterType): boolean => {
	// 	switch (filterType) {
	// 		case 'text': {
	// 			const textCondition = condition as FilterModelConditionText;
	// 			return textCondition.type !== null && textCondition.value !== null;
	// 		}
	// 		case 'number': {
	// 			const numberCondition = condition as FilterModelConditionNumber;
	// 			if (numberCondition.type === null || numberCondition.value === null) return false;
	// 			if (numberCondition.type === 'between') return numberCondition.endValue !== null;
	// 			return true;
	// 		}
	// 		case 'boolean': {
	// 			const booleanCondition = condition as FilterModelConditionBoolean;
	// 			return booleanCondition.type !== null && booleanCondition.value !== null;
	// 		}
	// 		case 'date': {
	// 			const dateCondition = condition as FilterModelConditionDate;
	// 			if (dateCondition.type === null || dateCondition.value === null) return false;
	// 			if (dateCondition.type === 'between') return dateCondition.endValue !== null;
	// 			return true;
	// 		}
	// 		case 'enum': {
	// 			const enumCondition = condition as FilterModelConditionEnum;
	// 			return enumCondition.type !== null && enumCondition.value !== null;
	// 		}
	// 		default:
	// 			return false;
	// 	}
	// };

	const filteredColumnFilters = inputParams.columnFilters.filter(columnFilter => {
		const conditions = columnFilter.filterModel.conditions;
		return conditions.length > 0
		// 	&& conditions.some(condition =>
		// 	isValidCondition(condition, columnFilter.type)
		// );
	});

	return {
		...inputParams,
		columnFilters: filteredColumnFilters.length > 0 ? filteredColumnFilters : []
	};
}
