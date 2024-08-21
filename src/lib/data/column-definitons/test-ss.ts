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
		checkboxSelection: true,
		maxWidth: 36,
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