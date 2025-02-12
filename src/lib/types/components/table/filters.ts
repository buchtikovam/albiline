// {
// 	"name": {
// 	"filterType": "multi",
// 		"filterModels": [
// 		{
// 			"filterType": "text",
// 			"type": "contains",
// 			"filter": "pepa"
// 		}
// 	]
// }
// }

import type {FilterModel} from "ag-grid-enterprise";

export type StoredFilters = {
	id: number;
	label: string;
	filters: FilterModel;
}
