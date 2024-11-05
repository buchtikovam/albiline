import type { AutoForm } from "$lib/types/components/form/autoform/autoform";
import { z } from "zod";
import type { AutoFormNew } from '$lib/types/components/form/autoform/autoformNew';
import { v4 as uuidv4 } from 'uuid';


export const customerAddressDetailFormDef: AutoFormNew = {
	"col1" : [
		{
			field: "section_addressDetail",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"name": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"customerAddressCode": {
							type: "text",
							schema: z.string(),
						},
						"companyName": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"street": {
							type: "text",
							schema: z.string(),
						},
						"city": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"postalCode": {
							type: "text",
							schema: z.string(),
						},
						"countryCode": {
							type: "text",
							schema: z.string(),
						},
					}
				}
			]
		},

		{
			field: "section_oz",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"dealerCode": {
							type: "text",
							schema: z.string(),
						},
						"areaCode": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"areaId": {
							type: "text",
							schema: z.string(),
						},
						"_areaId": {
							type: "empty",
						},
					}
				}
			]
		}
	],

	"col2" : [
		{
			field: "section_settings",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"paymentTypeCode": {
							type: "text",
							schema: z.string(),
						},
						"dueDays": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"invoiceCopies": {
							type: "text",
							schema: z.string(),
						},
						"deliveryNoteCopies": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"customerRank": {
							type: "text",
							schema: z.string(),
						},
						"retailStoreTypeId": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"customerStoreCode": {
							type: "text",
							schema: z.string(),
						},
						"customerStoreEan": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 5
					rowType: "full",
					inputs: {
						"packingNote": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 6
					rowType: "checkbox",
					inputs: {
						"consignmentSaleEnabled": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isReturnAllowed": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isForConsignmentReturn": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"useAssortedEanCodes": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"pickingBoxPacking": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"splitOrderByFood": {
							type: "checkbox",
							schema: z.boolean(),
						},
					}
				}
			]
		},
		{
			field: "section_other",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"note": {
							type: "text",
							schema: z.string(),
						},
					}
				},
			]
		}
	]
}



export const customerAdressDetailFormDef: AutoForm =
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
					{ // ?row 4
						id: 4,
						rowType: "full",
						rowInputs: [
							{ // ?input 1
								label: "Číslo prodejny",
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
							{
								type: 'empty'
							}
						]
					},
				]
			}
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
					{ // ?row 3
						id: 9,
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
								label: "Asortní EANy",
								type: "checkbox",
								variableName: "Asortní EANy",
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

			{ // ?section 2
				id: 2,
				label: "Ostatní",
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
				]
			},
		]
	}
