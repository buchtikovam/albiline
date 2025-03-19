import type {ColumnFilter, ColumnFilterModelCondition} from "$lib/types/components/input-params/inputParams";
import {parseStringToDateLong} from "$lib/utils/formatting/parseStringToDateLong";




export function getColumnFilters(columnFilters: ColumnFilter[]|undefined) {
	const cleanedColumnFilters: ColumnFilter[] = [];

	if (columnFilters) {
		columnFilters.forEach((columnFilter) => {
			if (
				columnFilter.filterModel.conditions.length > 0 &&
				columnFilter.columnName !== null
			) {
				let cleanedConditions: ColumnFilterModelCondition[] = [];

				if (columnFilter.type === "text") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.value !== null &&
							condition.value !== ""
						) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "number") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.type !== "between" &&
							condition.value !== null
						) {
							cleanedConditions.push(condition);
						}

						if (
							condition.type === "between" &&
							condition.value &&
							condition.endValue
						) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "boolean") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (condition.type !== null) {
							const cleanCondition = condition;
							cleanCondition.value = condition.type === "true";
							cleanedConditions.push(cleanCondition);
						}
					})
				}

				if (columnFilter.type === "date") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.type !== "between" &&
							condition.value
						) {
							// @ts-ignore
							cleanedConditions.push(condition);
						}

						if (
							condition.type === "between" &&
							condition.value &&
							condition.endValue
						) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "enum") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						cleanedConditions.push(condition);
					})
				}

				if (cleanedConditions.length > 0) {
					let cleanedColumnFilter = columnFilter;

					if (cleanedConditions.length === 1) {
						cleanedColumnFilter.filterModel.operator = null;
					}

					cleanedColumnFilter.filterModel.conditions = cleanedConditions;
					cleanedColumnFilters.push(cleanedColumnFilter);
				}
			}
		})

		cleanedColumnFilters.forEach((columnFilter) => {
			// @ts-ignore
			delete columnFilter.id
		})
	}


	return cleanedColumnFilters;
}
