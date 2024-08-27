export const testSSColDef = [
	{ 
		headerCheckboxSelection: true,
		editable: false,
		filter: false,
		resizable: false, 
		pinned: true,
		suppressHeaderMenuButton: true,
		suppressHeaderFilterButton: true, 
		suppressMovable: true,
		field: "rowNumber",
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
					filterParams: {
						values: await getCategoryValues()
					}
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

async function getCategoryValues() { 
	return await fetch('https://dummyjson.com/products?limit=1000')
		.then(res => res.json())
		.then((data) => data.products.map((product) => product.category));
}

/* TODO: Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)
	59 |            filter: "agSetColumnFilter",
	60 |            filterParams: {
	61 |              values: await getCategoryValues()
	   |                     ^
	62 |            }
	63 |          }
*/ 