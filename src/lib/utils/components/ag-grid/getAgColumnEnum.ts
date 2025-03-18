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
				values: async (params: SetFilterValuesFuncParams) => {
					const values = await getOptions();
					params.success(values);
				},
				buttons: ["apply", "reset"],
			}
		};

		cellEditorParams = {
			values: new Promise(resolve => {
				setTimeout(() => resolve(getOptions()), 1000);
			}),
		}
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
