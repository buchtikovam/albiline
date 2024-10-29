import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
import { z } from "zod";


export const customerAddressDetailFormDef: AutoForm =
	{
		col1 : [
			{ // ?section 1
				id: 1,
				label: "Detail adresy",
				isOpen: true,
				sectionDef: [
					{ // ?row 
						id: 1,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Název",
								type: "text",
								variableName: "name",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "Město",
								type: "text",
								variableName: "city",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "Země",
								type: "text",
								variableName: "cc",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "Společnost",
								type: "text",
								variableName: "company",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "Splatnost",
								type: "text",
								variableName: "due_days",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "Počet dodacích listů",
								type: "number",
								variableName: "dl_no",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "Typ prodejny",
								type: "text",
								variableName: "storeCode",
								schema: z.string().min(3).max(9),
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
								schema: z.string().min(3).max(9),
							},
							{ // ?input 2
								label: "EAN zákazníka",
								type: "text",
								variableName: "customerStoreEan",
								schema: z.string().min(3).max(9),
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
								schema: z.boolean(),
							},
							{
								label: "Vratka povolena",
								type: "checkbox",
								variableName: "Vratka povolena",
								schema: z.boolean(),
							},
							{
								label: "Kontrola u vratek",
								type: "checkbox",
								variableName: "Kontrola u vratek",
								schema: z.boolean(),
							},
							{
								label: "Požívat as. EANy",
								type: "checkbox",
								variableName: "Požívat as. EANy",
								schema: z.boolean(),
							},
							{
								label: "Balit do KLT",
								type: "checkbox",
								variableName: "Balit do KLT",
								schema: z.boolean(),
							},
							{
								label: "Food/Nonfood",
								type: "checkbox",
								variableName: "Food/Nonfood",
								schema: z.boolean(),
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
								schema: z.string(),
							},
							{
								label: "OM",
								type: "text",
								variableName: "OM",
								schema: z.string(),
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
								schema: z.string(),
							},
						]
					},
				]
			}
		]
	}
