// import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
//
//
// export function addColumnFilter(inputParams: InputParamsType) {
// 	if (inputParams.columnFilters) {
// 		let lastIndex = 0;
//
// 		inputParams.columnFilters.length > 0
// 			? lastIndex = inputParams.columnFilters[inputParams.columnFilters.length - 1].id || 0
// 			: lastIndex = 0;
//
// 		inputParams.columnFilters.push({
// 			id: lastIndex + 1,
// 			columnName: null,
// 			type: "text",
// 			filterModel: {
// 				operator: null,
// 				conditions: [{
// 					type: null,
// 					value: null
// 				}]
// 			}
// 		})
// 	}
// }
