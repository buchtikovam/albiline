export const testColDef = [
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
		headerName: "Název",
		width: 240,
	},
	{ 
		field: "description",
		headerName: "Popis",
		editable: true,
		width: 240,
	},
	{ 
		field: "category",
		headerName: "Kategorie",
		editable: true,
		width: 100,
	},
	{ 
		field: "price",
		headerName: "Cena",
		editable: true,
		width: 80,
	},
	{ 
		field: "discountPercentage",
		headerName: "Výše slevy",
		editable: true,
		width: 80,
	}
]