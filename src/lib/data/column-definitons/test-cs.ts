export const testCSColDef = [
	{ 
		headerCheckboxSelection: true,
		editable: false,
		filter: false,
		resizable: false, 
		pinned: true,
		suppressHeaderMenuButton: true,
		suppressHeaderFilterButton: true, 
		suppressMovable: true,
		checkboxSelection: true,
		maxWidth: 34,
		headerClass: 'ag-header-checkbox',
	},
	{ 
		field: "title",
		width: 240,
		headerName: "Název",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			],
		},
	},
	{ 
		field: "description",
		headerName: "Popis",
		editable: true,
		width: 240,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			],
		},
	},
	{ 
		field: "category",
		headerName: "Kategorie",
		editable: true,
		width: 100,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
				{
					filter: 'agSetColumnFilter',
				},
			],
		},
	},
	{ 
		field: "price",
		headerName: "Cena",
		editable: true,
		width: 80,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			],
		},
	},
	{ 
		field: "discountPercentage",
		headerName: "Výše slevy",
		editable: true,
		width: 80,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			],
		},
	}
]
