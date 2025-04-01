// import {apiServicePostHandled} from "$lib/api/apiService.svelte";
// import { db } from '../../../../db';
// import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
//
//
//
// export async function apiGetProductStockInventoryData(
// 	inputParams: InputParamsType,
// ) {
// 	let response = await apiServicePostHandled("pageData", inputParams);
//
// 	if (response.success) {
// 		let respData = await response.data;
// 		console.log(respData.items)
// 		db.ProductStockInventory.bulkAdd(respData.items)
// 	}
//
// 	// throw new Error('Failed to fetch ProductStockInventory data');
// }
