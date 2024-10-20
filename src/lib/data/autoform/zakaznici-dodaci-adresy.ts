import type { AutoForm } from "$lib/types/components/form/autoform/autoform";

export const zakazniciDodaciAdresyFormDef: AutoForm =
	{
		col1 : [
			{ // ?section 1
				id: 1,
				label: "Detail adresy",
				isOpen: true,
				sectionDef: [
					{ // ?row 1
						id: 1,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Název",
								type: "text",
								variableName: "name",
							},
						]
					},
					{ // ?row 2
						id: 2,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Ulice",
								type: "text",
								variableName: "street",
							},
							{ // ?input 2
								label: "Město",
								type: "text",
								variableName: "city",
							},
						]
					},
					{ // ?row 3
						id: 3,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "PSČ",
								type: "text",
								variableName: "postalCode",
							},
							{ // ?input 2
								label: "Země",
								type: "text",
								variableName: "cc",
							},
						]
					},
					{ // ?row 4
						id: 4,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Číslo dodací adresy",
								type: "number",
								variableName: "customerAddressCode",
							},
							{ // ?input 2
								label: "Společnost",
								type: "text",
								variableName: "company",
							},
						]
					},
				]
			},

			{ // ?section 2
				id: 2,
				label: "Popis",
				isOpen: true,
				sectionDef: [
					{ // ?row 1
						id: 1,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Poznámka",
								type: "text",
								variableName: "note",
							},

						]
					},
					{ // ?row 2
						id: 2,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Bližší popis",
								type: "text",
								variableName: "closer-desc",
							},
							{ // ?input 2
								label: "Zodpovědná osoba",
								type: "text",
								variableName: "resp-person",
							},
						]
					},
					{ // ?row 3
						id: 3,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Poznámka pro balení",
								type: "text",
								variableName: "packing-note",
							},
						]
					},
				]
			},
		],

		col2 : [
			{ // ?section 5
				id: 3,
				label: "Nastavení",
				isOpen: true,
				sectionDef: [
					{ // ?row 1
						id: 1,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Typ platby",
								type: "text",
								variableName: "payment_code",
							},
							{ // ?input 2
								label: "Splatnost",
								type: "text",
								variableName: "due_days",
							},
						]
					},
					{ // ?row 2
						id: 2,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Počet faktur",
								type: "number",
								variableName: "invoice_no",
							},
							{ // ?input 2
								label: "Počet dodacích listů",
								type: "number",
								variableName: "dl_no",
							},
						]
					},
					{ // ?row 3
						id: 3,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Bonita",
								type: "text",
								variableName: "isBad",
							},
							{ // ?input 2
								label: "Typ prodejny",
								type: "text",
								variableName: "storeCode",
							},
						]
					},
					{ // ?row 4
						id: 4,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "ID zákazníka dle zákazníka",
								type: "text",
								variableName: "customerStoreCode",
							},
							{ // ?input 2
								label: "EAN zákazníka",
								type: "text",
								variableName: "customerStoreEan",
							},
						]
					},
					{ // ?row 4
						id: 5,
						rowType: "checkbox",
						rowInputs: [
							{
								label: "Komise",
								type: "checkbox",
								variableName: "consignmentSaleEnabled",
							},
							{
								label: "Vratka povolena",
								type: "checkbox",
								variableName: "Vratka povolena",
							},
							{
								label: "Kontrola u vratek",
								type: "checkbox",
								variableName: "Kontrola u vratek",
							},
							{
								label: "Požívat as. EANy",
								type: "checkbox",
								variableName: "Požívat as. EANy",
							},
							{
								label: "Balit do KLT",
								type: "checkbox",
								variableName: "Balit do KLT",
							},
							{
								label: "Food/Nonfood",
								type: "checkbox",
								variableName: "Food/Nonfood",
							},
						]
					},
				]
			},

			{ // ?section 4
				id: 4,
				label: "OZ a oblasti",
				isOpen: true,
				sectionDef: [
					{ // ?row 1
						id: 1,
						rowType: "full",
						rowInputs: [
							{
								label: "OZ",
								type: "text",
								variableName: "OZ",
							},
							{
								label: "OM",
								type: "text",
								variableName: "OM",
							},
						]
					},
					{ // ?row 2
						id: 2,
						rowType: "full",
						rowInputs: [
							{
								label: "Oblast",
								type: "text",
								variableName: "Oblast",
							},
							{
								label: "Merchendiser",
								type: "text",
								variableName: "Merchendiser",
							},
						]
					},
				]
			}
		]
	}
