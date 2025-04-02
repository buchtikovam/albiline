import type {SetFilterValuesFuncParams} from "ag-grid-community";

export function getAgColumnEnum(
	field: string,
	width: number,
	editable: boolean,
	hidden: boolean,
	type: 'clientSide'|'serverSide',
	cellClass: string[],
	custom?: Record<string, any>,
	clientOptions?: string[],
	getOptions?: () => Promise<string[]>,
) {
	let setFilter = {}
	let cellEditorParams = {}

	if (type === 'clientSide') {
		setFilter = {
			filter: 'agSetColumnFilter',
			filterParams: {
				values: clientOptions,
				buttons: ["apply", "reset"],
			}
		};

		cellEditorParams = {
			values: clientOptions,
		}
	}


	if (type === 'serverSide' && getOptions) {
		setFilter = {
			filter: 'agSetColumnFilter',
			filterParams: {
				values: (params: SetFilterValuesFuncParams) => {
					// Start loading the options
					getOptions().then(values => {
						// Pass the loaded values to the grid using the success callback
						params.success(values);
					}).catch(error => {
						// Handle errors appropriately
						console.error('Failed to load filter options:', error);
						params.success([]); // Fallback to empty array
					});
				},
				buttons: ["apply", "reset"],
			}
		};

		// For cell editor values
		cellEditorParams = {
			values: () => {
				return new Promise((resolve) => {
					getOptions().then(values => {
						resolve(values);
					}).catch(error => {
						console.error('Failed to load editor options:', error);
						resolve([]); // Fallback to empty array
					});
				});
			}
		};
	}

	return {
		field: field,
		cellDataType: "text",
		editable: editable,
		hide: hidden,
		cellClass: cellClass,
		width: width,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
				setFilter,
			],
		},
		cellEditor: 'agRichSelectCellEditor',
		cellEditorParams: cellEditorParams,
		...custom,
	}
}
